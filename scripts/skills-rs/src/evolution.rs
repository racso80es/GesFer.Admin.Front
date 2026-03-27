//! Utilidades compartidas para sddia_evolution_* (skills-rs).

use sha2::{Digest, Sha256};
use std::path::{Path, PathBuf};

/// Raíz del repositorio: `scripts/skills-rs` → dos niveles arriba = raíz del repo (padre de `scripts/`).
pub fn repo_root() -> PathBuf {
    let manifest = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    manifest
        .parent()
        .expect("CARGO_MANIFEST_DIR debe tener padre (scripts/)")
        .parent()
        .expect("scripts/skills-rs debe vivir bajo scripts/ en la raíz del repo")
        .to_path_buf()
}

pub fn evolution_dir(root: &Path) -> PathBuf {
    root.join("SddIA").join("evolution")
}

pub fn sha256_hex(bytes: &[u8]) -> String {
    let mut h = Sha256::new();
    h.update(bytes);
    hex::encode(h.finalize())
}

/// UUID v4 en minúsculas con guiones (formato canónico).
pub fn is_uuid_md_filename(name: &str) -> bool {
    if !name.ends_with(".md") {
        return false;
    }
    let stem = name.trim_end_matches(".md");
    uuid::Uuid::parse_str(stem).is_ok()
}

pub fn is_under_sddia(p: &str) -> bool {
    let norm = p.replace('\\', "/");
    norm.starts_with("SddIA/")
}

/// Hay evidencia de registro: fichero UUID nuevo o índice modificado.
pub fn has_registration_evidence(status_lines: &[(char, String)]) -> bool {
    let mut new_uuid = false;
    let mut log_touched = false;
    for (st, path) in status_lines {
        let n = path.replace('\\', "/");
        if *st == 'A' && n.starts_with("SddIA/evolution/") {
            if let Some(f) = Path::new(&n).file_name().and_then(|s| s.to_str()) {
                if is_uuid_md_filename(f) {
                    new_uuid = true;
                }
            }
        }
        if (*st == 'A' || *st == 'M') && n == "SddIA/evolution/Evolution_log.md" {
            log_touched = true;
        }
    }
    new_uuid || log_touched
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn uuid_filename_detected() {
        assert!(is_uuid_md_filename(
            "a1b2c3d4-e5f6-47a8-9abc-def012345678.md"
        ));
        assert!(!is_uuid_md_filename("Evolution_log.md"));
    }
}
