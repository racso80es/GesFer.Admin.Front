//! Skill invoke-commit en Rust (contrato skills).
//! Ejecuta git add + git commit con parámetros directos. Registra en docs/diagnostics/<branch>/execution_history.json.
//! Uso: invoke_commit.exe --message "msg" [--files "a,b" | --all] [--type feat] [--scope name] [--fase Accion] [--contexto GesFer]

use std::process::Command;
use std::env;
use std::fs;
use std::io::Write;
use chrono::Utc;

fn main() {
    let args: Vec<String> = env::args().collect();
    let mut message = String::new();
    let mut files = String::new();
    let mut all = false;
    let mut commit_type = "feat".to_string();
    let mut scope = String::new();
    let mut fase = "Accion".to_string();
    let mut contexto = "GesFer".to_string();
    let mut i = 1;
    while i < args.len() {
        if (args[i] == "--message" || args[i] == "-m") && i + 1 < args.len() {
            message = args[i + 1].clone();
            i += 2;
            continue;
        }
        if (args[i] == "--files" || args[i] == "-Files") && i + 1 < args.len() {
            files = args[i + 1].clone();
            i += 2;
            continue;
        }
        if args[i] == "--all" || args[i] == "-a" {
            all = true;
            i += 1;
            continue;
        }
        if (args[i] == "--type" || args[i] == "-Type") && i + 1 < args.len() {
            commit_type = args[i + 1].clone();
            i += 2;
            continue;
        }
        if (args[i] == "--scope" || args[i] == "-Scope") && i + 1 < args.len() {
            scope = args[i + 1].clone();
            i += 2;
            continue;
        }
        if (args[i] == "--fase" || args[i] == "-Fase") && i + 1 < args.len() {
            fase = args[i + 1].clone();
            i += 2;
            continue;
        }
        if (args[i] == "--contexto" || args[i] == "-Contexto") && i + 1 < args.len() {
            contexto = args[i + 1].clone();
            i += 2;
            continue;
        }
        i += 1;
    }
    if message.is_empty() {
        eprintln!("Uso: {} --message \"<msg>\" [--files \"a.md,b.json\"] [--all] [--type feat] [--scope name]", args.get(0).unwrap_or(&"invoke_commit".into()));
        eprintln!("  --message, -m   Mensaje del commit (obligatorio)");
        eprintln!("  --files         Rutas separadas por coma");
        eprintln!("  --all, -a       git add -A");
        eprintln!("  --type          feat|fix|chore|docs|refactor (default: feat)");
        eprintln!("  --scope         Scope Conventional Commits");
        std::process::exit(1);
    }
    if files.is_empty() && !all {
        eprintln!("Debe especificar --files o --all");
        std::process::exit(1);
    }
    if !files.is_empty() && all {
        eprintln!("--files y --all son excluyentes");
        std::process::exit(1);
    }

    let branch = Command::new("git")
        .args(["rev-parse", "--abbrev-ref", "HEAD"])
        .output()
        .ok()
        .and_then(|o| {
            if o.status.success() {
                Some(String::from_utf8_lossy(&o.stdout).trim().to_string())
            } else {
                None
            }
        })
        .unwrap_or_else(|| "unknown".to_string());

    let full_message = if scope.is_empty() {
        format!("{}: {}", commit_type, message.trim())
    } else {
        format!("{}({}): {}", commit_type, scope.trim(), message.trim())
    };

    let run = |cmd: &str, cargs: &[&str]| -> (bool, String) {
        let out = Command::new(cmd).args(cargs).output();
        match out {
            Ok(o) => {
                let out_str = String::from_utf8_lossy(&o.stdout);
                let err_str = String::from_utf8_lossy(&o.stderr);
                let combined = format!("{}\n{}", out_str, err_str).trim().to_string();
                (o.status.success(), combined)
            }
            Err(e) => (false, e.to_string()),
        }
    };

    if all {
        let (ok, out) = run("git", &["add", "-A"]);
        if !ok {
            eprintln!("git add -A falló: {}", out);
            log_execution(&branch, &fase, &contexto, "git add -A", false, 1, &out);
            std::process::exit(1);
        }
    } else {
        let file_list: Vec<&str> = files.split(',').map(|s| s.trim()).filter(|s| !s.is_empty()).collect();
        if file_list.is_empty() {
            eprintln!("--files vacío o inválido");
            std::process::exit(1);
        }
        let mut add_args = vec!["add"];
        add_args.extend(file_list.iter().map(|s| *s));
        let (ok, out) = run("git", &add_args);
        if !ok {
            eprintln!("git add falló: {}", out);
            log_execution(&branch, &fase, &contexto, &format!("git add {}", files), false, 1, &out);
            std::process::exit(1);
        }
    }

    let (ok, out) = run("git", &["commit", "-m", &full_message]);
    if !ok {
        eprintln!("git commit falló: {}", out);
        log_execution(&branch, &fase, &contexto, &format!("git commit -m \"{}\"", full_message), false, 1, &out);
        std::process::exit(1);
    }

    let cmd_log = if all {
        format!("git add -A; git commit -m \"{}\"", full_message)
    } else {
        format!("git add {}; git commit -m \"{}\"", files, full_message)
    };
    log_execution(&branch, &fase, &contexto, &cmd_log, true, 0, &out);

    // Incluir execution_history en el mismo commit (evitar que quede fuera del PR)
    let history_path = format!("docs/diagnostics/{}/execution_history.json", branch);
    if std::path::Path::new(&history_path).exists() {
        let (add_ok, _) = run("git", &["add", &history_path]);
        if add_ok {
            let _ = run("git", &["commit", "--amend", "--no-edit"]);
        }
    }
    std::process::exit(0);
}

fn log_execution(branch: &str, fase: &str, contexto: &str, command: &str, success: bool, exit_code: i32, output: &str) {
    let log_dir = format!("docs/diagnostics/{}", branch);
    let _ = fs::create_dir_all(&log_dir);
    let log_path = format!("{}/execution_history.json", log_dir);
    let timestamp = Utc::now().to_rfc3339();
    let status_str = if success { "Success" } else { "Failed" };
    let log_entry = format!(
        "{{\"Timestamp\":\"{}\",\"Fase\":\"{}\",\"Contexto\":\"{}\",\"Command\":\"{}\",\"Status\":\"{}\",\"ExitCode\":{},\"Output\":\"{}\"}}\n",
        timestamp,
        fase.replace('"', "\\\""),
        contexto.replace('"', "\\\""),
        command.replace('"', "\\\"").replace('\n', " "),
        status_str,
        exit_code,
        output.replace('"', "\\\"").replace('\n', " ").chars().take(500).collect::<String>()
    );
    if let Ok(mut f) = fs::OpenOptions::new().create(true).append(true).open(&log_path) {
        let _ = f.write_all(log_entry.as_bytes());
    }
}
