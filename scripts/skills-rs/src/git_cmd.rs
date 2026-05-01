//! Utilidades mínimas para invocar `git` desde skills.

use serde_json::Value;
use std::path::Path;
use std::process::Command;

/// Cambia el directorio de trabajo si `request.workingDirectory` está definido.
pub fn set_working_dir_from_request(request: &Value) -> Result<(), String> {
    if let Some(wd) = request.get("workingDirectory").and_then(|v| v.as_str()) {
        let p = Path::new(wd);
        if !p.is_dir() {
            return Err(format!("workingDirectory no existe o no es carpeta: {}", wd));
        }
        std::env::set_current_dir(p).map_err(|e| format!("workingDirectory: {}", e))?;
    }
    Ok(())
}

/// Ejecuta `git` con argumentos; si falla el proceso, devuelve Err con stderr+stdout.
pub fn git(args: &[&str]) -> Result<String, String> {
    let out = Command::new("git")
        .args(args)
        .output()
        .map_err(|e| format!("git {}: {}", args.join(" "), e))?;
    let stdout = String::from_utf8_lossy(&out.stdout).to_string();
    let stderr = String::from_utf8_lossy(&out.stderr).to_string();
    if !out.status.success() {
        return Err(format!(
            "git {} falló ({}): {}",
            args.join(" "),
            out.status.code().unwrap_or(-1),
            format!("{}\n{}", stdout, stderr).trim()
        ));
    }
    Ok(stdout)
}

/// Como `git` pero no exige código de salida 0 (útil para status, rev-parse en algunos casos).
pub fn git_output(args: &[&str]) -> Result<(i32, String, String), String> {
    let out = Command::new("git")
        .args(args)
        .output()
        .map_err(|e| format!("git {}: {}", args.join(" "), e))?;
    let code = out.status.code().unwrap_or(-1);
    let stdout = String::from_utf8_lossy(&out.stdout).to_string();
    let stderr = String::from_utf8_lossy(&out.stderr).to_string();
    Ok((code, stdout, stderr))
}
