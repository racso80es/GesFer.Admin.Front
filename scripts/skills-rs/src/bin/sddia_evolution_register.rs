//! Registro de cambio SddIA evolution (UUID, índice, detalle, hash).
//! Lee JSON por stdin: `{ "request": { ... } }` o cuerpo plano con los campos del request.

use gesfer_skills::evolution::{evolution_dir, repo_root, sha256_hex};
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::fs;
use std::io::{self, Read};
use std::path::Path;
use uuid::Uuid;

#[derive(Debug, Deserialize)]
struct RegisterRequest {
    autor: String,
    proyecto_origen_cambio: String,
    contexto: String,
    descripcion_breve: String,
    tipo_operacion: String,
    cambios_realizados: Vec<CambioPar>,
    impacto: String,
    #[serde(default)]
    replicacion_instrucciones: String,
    #[serde(default)]
    rutas_eliminadas: Option<Vec<String>>,
    #[serde(default)]
    commit_referencia_previo: Option<String>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
struct CambioPar {
    anterior: String,
    nuevo: String,
}

#[derive(Serialize)]
struct ReplicacionHash {
    instrucciones: String,
}

#[derive(Serialize)]
struct FrontmatterForHash {
    autor: String,
    cambios_realizados: Vec<CambioPar>,
    contexto: String,
    contrato_version: String,
    descripcion_breve: String,
    fecha: String,
    id_cambio: String,
    impacto: String,
    proyecto_origen_cambio: String,
    replicacion: ReplicacionHash,
    tipo_operacion: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    commit_referencia_previo: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    rutas_eliminadas: Option<Vec<String>>,
}

#[derive(Serialize)]
struct ReplicacionFull {
    hash_integridad: String,
    instrucciones: String,
}

#[derive(Serialize)]
struct FrontmatterFull {
    autor: String,
    cambios_realizados: Vec<CambioPar>,
    contexto: String,
    contrato_version: String,
    descripcion_breve: String,
    fecha: String,
    id_cambio: String,
    impacto: String,
    proyecto_origen_cambio: String,
    replicacion: ReplicacionFull,
    tipo_operacion: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    commit_referencia_previo: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    rutas_eliminadas: Option<Vec<String>>,
}

fn main() {
    if let Err(e) = run() {
        eprintln!("{}", e);
        let err = json!({
            "success": false,
            "error": e
        });
        println!("{}", err);
        std::process::exit(1);
    }
}

fn run() -> Result<(), String> {
    let mut buf = String::new();
    io::stdin()
        .read_to_string(&mut buf)
        .map_err(|e| e.to_string())?;
    let v: serde_json::Value = serde_json::from_str(&buf).map_err(|e| e.to_string())?;
    let req: RegisterRequest = if let Some(r) = v.get("request") {
        serde_json::from_value(r.clone()).map_err(|e| e.to_string())?
    } else {
        serde_json::from_value(v).map_err(|e| e.to_string())?
    };

    let id = Uuid::new_v4();
    let id_str = id.to_string();
    let fecha = chrono::Utc::now().to_rfc3339();

    let fm_hash = FrontmatterForHash {
        autor: req.autor.clone(),
        cambios_realizados: req.cambios_realizados.clone(),
        contexto: req.contexto.clone(),
        contrato_version: "1.1".to_string(),
        descripcion_breve: req.descripcion_breve.clone(),
        fecha: fecha.clone(),
        id_cambio: id_str.clone(),
        impacto: req.impacto.clone(),
        proyecto_origen_cambio: req.proyecto_origen_cambio.clone(),
        replicacion: ReplicacionHash {
            instrucciones: req.replicacion_instrucciones.clone(),
        },
        tipo_operacion: req.tipo_operacion.clone(),
        commit_referencia_previo: req.commit_referencia_previo.clone(),
        rutas_eliminadas: req.rutas_eliminadas.clone(),
    };

    let yaml_for_hash = serde_yaml::to_string(&fm_hash).map_err(|e| e.to_string())?;
    let hash = sha256_hex(yaml_for_hash.as_bytes());

    let fm_full = FrontmatterFull {
        autor: req.autor,
        cambios_realizados: req.cambios_realizados,
        contexto: req.contexto,
        contrato_version: "1.1".to_string(),
        descripcion_breve: req.descripcion_breve,
        fecha,
        id_cambio: id_str.clone(),
        impacto: req.impacto,
        proyecto_origen_cambio: req.proyecto_origen_cambio,
        replicacion: ReplicacionFull {
            hash_integridad: hash.clone(),
            instrucciones: req.replicacion_instrucciones,
        },
        tipo_operacion: req.tipo_operacion,
        commit_referencia_previo: req.commit_referencia_previo,
        rutas_eliminadas: req.rutas_eliminadas,
    };

    let yaml_body = serde_yaml::to_string(&fm_full).map_err(|e| e.to_string())?;
    let md_content = format!(
        "---\n{}---\n\n## Resumen\n\nRegistro generado por `sddia_evolution_register`.\n",
        yaml_body
    );

    let root = repo_root();
    let evo = evolution_dir(&root);
    fs::create_dir_all(&evo).map_err(|e| e.to_string())?;
    let detail_path = evo.join(format!("{}.md", id_str));
    fs::write(&detail_path, &md_content).map_err(|e| e.to_string())?;

    let log_path = evo.join("Evolution_log.md");
    upsert_log_row(&log_path, &id_str, &fm_full.fecha, &fm_full.descripcion_breve)?;

    let out = json!({
        "success": true,
        "id_cambio": id_str,
        "detail_path": detail_path.to_string_lossy(),
        "hash_integridad": hash,
    });
    println!("{}", serde_json::to_string(&out).unwrap());
    Ok(())
}

fn upsert_log_row(log: &Path, id: &str, fecha: &str, desc: &str) -> Result<(), String> {
    let mut s = if log.exists() {
        fs::read_to_string(log).map_err(|e| e.to_string())?
    } else {
        String::new()
    };

    let row = format!("| {} | {} | {} |", id, fecha, desc.replace('|', "\\|"));
    let placeholder = "| *(pendiente primer registro oficial vía `sddia_evolution_register`)* | — | — |";
    if s.contains("pendiente primer registro oficial") {
        s = s.replace(placeholder, &row);
    } else if !s.contains(id) {
        s.push('\n');
        s.push_str(&row);
        s.push('\n');
    }
    fs::write(log, s).map_err(|e| e.to_string())?;
    Ok(())
}
