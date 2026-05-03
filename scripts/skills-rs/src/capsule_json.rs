//! Envelope JSON v2.0 para cápsulas (skills). Ver SddIA/norms/capsule-json-io.md.

use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::env;
use std::io::{self, Read};
use std::time::Instant;

pub const SCHEMA_VERSION: &str = "2.0";

#[derive(Debug, Deserialize)]
pub struct EnvelopeIn {
    pub meta: MetaIn,
    pub request: Value,
}

#[derive(Debug, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct MetaIn {
    pub schema_version: String,
    pub entity_kind: String,
    pub entity_id: String,
    #[serde(default)]
    pub token: Option<Value>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct EnvelopeOut {
    pub meta: MetaOut,
    pub success: bool,
    pub exit_code: i32,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub feedback: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub result: Option<Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub duration_ms: Option<u64>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MetaOut {
    pub schema_version: String,
    pub entity_kind: String,
    pub entity_id: String,
}

#[derive(Debug)]
pub enum LoadError {
    SkipStdin,
    EmptyInput,
    Json(String),
}

/// Lee JSON de petición: variable `GESFER_CAPSULE_REQUEST`, o stdin si no está `GESFER_SKIP_STDIN=1`.
pub fn read_request_raw() -> Result<Vec<u8>, LoadError> {
    if let Ok(s) = env::var("GESFER_CAPSULE_REQUEST") {
        return Ok(s.into_bytes());
    }
    if env::var("GESFER_SKIP_STDIN").ok().as_deref() == Some("1") {
        return Err(LoadError::SkipStdin);
    }
    let mut buf = Vec::new();
    io::stdin()
        .read_to_end(&mut buf)
        .map_err(|e| LoadError::Json(e.to_string()))?;
    Ok(buf)
}

pub fn parse_envelope(entity_id_expected: &str, bytes: &[u8]) -> Result<(MetaIn, Value), LoadError> {
    let trimmed = std::str::from_utf8(bytes)
        .map_err(|e| LoadError::Json(e.to_string()))?
        .trim();
    if trimmed.is_empty() {
        return Err(LoadError::EmptyInput);
    }
    let env: EnvelopeIn =
        serde_json::from_str(trimmed).map_err(|e| LoadError::Json(e.to_string()))?;
    if env.meta.schema_version != SCHEMA_VERSION {
        return Err(LoadError::Json(format!(
            "meta.schemaVersion debe ser {}, recibido {}",
            SCHEMA_VERSION, env.meta.schema_version
        )));
    }
    if env.meta.entity_kind != "skill" {
        return Err(LoadError::Json(
            "meta.entityKind debe ser \"skill\"".into(),
        ));
    }
    if env.meta.entity_id != entity_id_expected {
        return Err(LoadError::Json(format!(
            "meta.entityId debe ser \"{}\", recibido \"{}\"",
            entity_id_expected, env.meta.entity_id
        )));
    }
    Ok((env.meta, env.request))
}

pub fn synthetic_meta(entity_id: &str) -> MetaIn {
    MetaIn {
        schema_version: SCHEMA_VERSION.to_string(),
        entity_kind: "skill".to_string(),
        entity_id: entity_id.to_string(),
        token: None,
    }
}

pub fn meta_out_from(m: &MetaIn) -> MetaOut {
    MetaOut {
        schema_version: m.schema_version.clone(),
        entity_kind: m.entity_kind.clone(),
        entity_id: m.entity_id.clone(),
    }
}

pub fn emit(
    meta_in: &MetaIn,
    success: bool,
    exit_code: i32,
    message: impl Into<String>,
    result: Option<Value>,
    feedback: Option<Vec<String>>,
    started: Instant,
) -> ! {
    let message = message.into();
    if success != (exit_code == 0) {
        let out = EnvelopeOut {
            meta: meta_out_from(meta_in),
            success: false,
            exit_code: 1,
            message: "Incoherencia interna: success y exitCode deben alinearse".into(),
            feedback: None,
            result: None,
            duration_ms: Some(started.elapsed().as_millis() as u64),
        };
        println!("{}", serde_json::to_string(&out).unwrap_or_else(|_| "{}".into()));
        std::process::exit(1);
    }
    let out = EnvelopeOut {
        meta: meta_out_from(meta_in),
        success,
        exit_code,
        message,
        feedback,
        result,
        duration_ms: Some(started.elapsed().as_millis() as u64),
    };
    println!("{}", serde_json::to_string(&out).unwrap_or_else(|_| "{}".into()));
    std::process::exit(exit_code);
}

pub fn emit_parse_error(entity_id: &str, err: LoadError) -> ! {
    let meta = synthetic_meta(entity_id);
    let (msg, code) = match err {
        LoadError::SkipStdin => ("Entrada JSON omitida (GESFER_SKIP_STDIN=1) sin modo CLI válido".into(), 1),
        LoadError::EmptyInput => ("Entrada JSON vacía".into(), 1),
        LoadError::Json(s) => (s, 1),
    };
    emit(
        &meta,
        false,
        code,
        msg,
        None,
        None,
        Instant::now(),
    );
}

/// Carga envelope desde env/stdin o construye `request` con `cli` si la entrada está vacía o `GESFER_SKIP_STDIN=1`.
pub fn load_or_cli<F>(entity_id: &str, cli: F) -> Result<(MetaIn, Value), LoadError>
where
    F: FnOnce() -> Result<Value, String>,
{
    let bytes = match read_request_raw() {
        Ok(b) => b,
        Err(LoadError::SkipStdin) => {
            let req = cli().map_err(LoadError::Json)?;
            return Ok((synthetic_meta(entity_id), req));
        }
        Err(e) => return Err(e),
    };
    let empty = std::str::from_utf8(&bytes)
        .map(|s| s.trim().is_empty())
        .unwrap_or(true);
    if empty {
        let req = cli().map_err(LoadError::Json)?;
        return Ok((synthetic_meta(entity_id), req));
    }
    match parse_envelope(entity_id, &bytes) {
        Ok(x) => Ok(x),
        Err(LoadError::EmptyInput) => {
            let req = cli().map_err(LoadError::Json)?;
            Ok((synthetic_meta(entity_id), req))
        }
        Err(e) => Err(e),
    }
}
