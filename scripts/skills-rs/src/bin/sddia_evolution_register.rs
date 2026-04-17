use chrono::Utc;
use clap::Parser;
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::fs::{self, OpenOptions};
use std::io::{Read, Write};
use std::path::{Path, PathBuf};
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct RegisterRequest {
    autor: String,
    descripcion_breve: String,
    tipo_operacion: String,
    contexto: Option<String>,
    proyecto_origen_cambio: Option<String>,
    impacto: Option<String>,
    #[serde(default)]
    cambios_realizados: Vec<CambioRealizado>,
    #[serde(default)]
    rutas_eliminadas: Option<Vec<String>>,
    #[serde(default)]
    commit_referencia_previo: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
struct CambioRealizado {
    anterior: Option<String>,
    nuevo: Option<String>,
}

#[derive(Serialize, Debug)]
struct EvolutionRecord {
    document_type: String,
    contrato_version: String,
    id_cambio: String,
    fecha: String,
    autor: String,
    proyecto_origen_cambio: String,
    contexto: String,
    descripcion_breve: String,
    tipo_operacion: String,
    cambios_realizados: Vec<CambioRealizado>,
    #[serde(skip_serializing_if = "Option::is_none")]
    rutas_eliminadas: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    commit_referencia_previo: Option<String>,
    impacto: String,
    replicacion: Replicacion,
}

#[derive(Serialize, Debug)]
struct Replicacion {
    instrucciones: String,
    hash_integrity: String,
}

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    #[arg(short, long)]
    input: String,
}

fn get_repo_root() -> PathBuf {
    // If CARGO_MANIFEST_DIR is set (e.g., during `cargo run`), use it.
    // Otherwise, assume the binary is being run from the repo root or another known good location,
    // and rely on the current directory.
    if let Ok(manifest_dir) = std::env::var("CARGO_MANIFEST_DIR") {
        Path::new(&manifest_dir)
            .parent()
            .and_then(|p| p.parent())
            .unwrap_or_else(|| Path::new("."))
            .to_path_buf()
    } else {
        std::env::current_dir().unwrap_or_else(|_| PathBuf::from("."))
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = Args::parse();

    // Read request
    let mut input_content = String::new();
    if args.input == "-" {
        std::io::stdin().read_to_string(&mut input_content)?;
    } else {
        input_content = fs::read_to_string(&args.input)?;
    }

    let req: RegisterRequest = serde_json::from_str(&input_content)?;

    let id_cambio = Uuid::new_v4().to_string();
    let fecha = Utc::now().to_rfc3339();

    let mut record = EvolutionRecord {
        document_type: "evolution_record".to_string(),
        contrato_version: "1.1".to_string(),
        id_cambio: id_cambio.clone(),
        fecha: fecha.clone(),
        autor: req.autor,
        proyecto_origen_cambio: req.proyecto_origen_cambio.unwrap_or_else(|| "GesFer".to_string()),
        contexto: req.contexto.clone().unwrap_or_else(|| "Actualización".to_string()),
        descripcion_breve: req.descripcion_breve.clone(),
        tipo_operacion: req.tipo_operacion,
        cambios_realizados: req.cambios_realizados,
        rutas_eliminadas: req.rutas_eliminadas,
        commit_referencia_previo: req.commit_referencia_previo,
        impacto: req.impacto.unwrap_or_else(|| "Bajo".to_string()),
        replicacion: Replicacion {
            instrucciones: "N/A".to_string(),
            hash_integrity: "SHA-256-PENDIENTE".to_string(),
        },
    };

    let frontmatter = serde_yaml::to_string(&record)?;

    let mut hasher = Sha256::new();
    hasher.update(frontmatter.as_bytes());
    let hash_result = format!("{:x}", hasher.finalize());

    record.replicacion.hash_integrity = hash_result;
    let final_frontmatter = serde_yaml::to_string(&record)?;

    let repo_root = get_repo_root();
    let evo_dir = repo_root.join("SddIA/evolution");
    fs::create_dir_all(&evo_dir)?;

    let record_path = evo_dir.join(format!("{}.md", id_cambio));
    let mut file = fs::File::create(&record_path)?;
    write!(
        file,
        "---\n{}---\n\n# {}\n\n{}",
        final_frontmatter, record.descripcion_breve, record.contexto
    )?;

    let log_path = evo_dir.join("Evolution_log.md");
    if let Ok(mut log_file) = OpenOptions::new().append(true).open(&log_path) {
        writeln!(
            log_file,
            "| {} | {} | {} |",
            id_cambio, fecha, record.descripcion_breve
        )?;
    }

    println!("Registro de evolución creado: {}", record_path.display());
    println!("{}", serde_json::json!({ "status": "ok", "id": id_cambio }));

    Ok(())
}
