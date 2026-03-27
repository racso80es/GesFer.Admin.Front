//! Valida que un diff git incluya trazabilidad evolution cuando toca SddIA/.

use gesfer_skills::evolution::{has_registration_evidence, is_under_sddia};
use serde_json::json;
use std::process::Command;

fn main() {
    let code = match run() {
        Ok(msg) => {
            println!(
                "{}",
                serde_json::to_string(&json!({ "success": true, "message": msg })).unwrap()
            );
            0
        }
        Err(e) => {
            eprintln!("{}", e);
            println!(
                "{}",
                serde_json::to_string(&json!({ "success": false, "error": e })).unwrap()
            );
            1
        }
    };
    std::process::exit(code);
}

fn run() -> Result<String, String> {
    let mut base = "origin/master".to_string();
    let mut head = "HEAD".to_string();
    let mut args = std::env::args().skip(1);
    while let Some(a) = args.next() {
        if a == "--base" {
            base = args.next().ok_or("--base requiere valor")?;
        } else if a == "--head" {
            head = args.next().ok_or("--head requiere valor")?;
        }
    }

    let names = git_diff_name_only(&base, &head)?;
    let sddia: Vec<String> = names
        .into_iter()
        .filter(|p| is_under_sddia(p))
        .collect();
    if sddia.is_empty() {
        return Ok("Sin cambios bajo SddIA/; validación omitida.".into());
    }

    let status = git_diff_name_status(&base, &head)?;
    let evidence = has_registration_evidence(&status);

    let outside_evolution = sddia.iter().any(|p| {
        let n = p.replace('\\', "/");
        !n.starts_with("SddIA/evolution/")
    });

    if outside_evolution && !evidence {
        return Err(format!(
            "Cambios bajo SddIA/ fuera de SddIA/evolution/ requieren registro evolution (nuevo {{uuid}}.md y/o Evolution_log.md). Archivos: {:?}",
            sddia
        ));
    }

    let contract_touched = status.iter().any(|(st, p)| {
        (*st == 'M' || *st == 'A')
            && p.replace('\\', "/")
                .ends_with("/evolution_contract.md")
    });

    if !outside_evolution && contract_touched && !evidence {
        return Err(
            "Cambio en evolution_contract.md requiere entrada de registro (uuid + índice)."
                .into(),
        );
    }

    Ok("Validación evolution OK.".into())
}

fn git_diff_name_only(base: &str, head: &str) -> Result<Vec<String>, String> {
    let out = Command::new("git")
        .args(["diff", "--name-only", &format!("{}..{}", base, head)])
        .output()
        .map_err(|e| format!("git: {}", e))?;
    if !out.status.success() {
        return Err(format!(
            "git diff --name-only falló: {}",
            String::from_utf8_lossy(&out.stderr)
        ));
    }
    Ok(String::from_utf8_lossy(&out.stdout)
        .lines()
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .collect())
}

fn git_diff_name_status(base: &str, head: &str) -> Result<Vec<(char, String)>, String> {
    let out = Command::new("git")
        .args(["diff", "--name-status", &format!("{}..{}", base, head)])
        .output()
        .map_err(|e| format!("git: {}", e))?;
    if !out.status.success() {
        return Err(format!(
            "git diff --name-status falló: {}",
            String::from_utf8_lossy(&out.stderr)
        ));
    }
    let mut v = Vec::new();
    for line in String::from_utf8_lossy(&out.stdout).lines() {
        let line = line.trim();
        if line.is_empty() {
            continue;
        }
        let mut parts = line.split_whitespace();
        let st = parts.next().ok_or("línea diff vacía")?;
        let status_char = st.chars().next().unwrap_or('?');
        let path = if st.starts_with('R') {
            parts.next();
            parts.next().unwrap_or("")
        } else {
            parts.next().unwrap_or("")
        };
        v.push((status_char, path.to_string()));
    }
    Ok(v)
}
