//! Skill git-save-snapshot: git add + commit (mensaje vía request).

use gesfer_skills::capsule_json;
use gesfer_skills::git_cmd;
use serde_json::{json, Value};
use std::env;
use std::time::Instant;

fn handle(req: &Value) -> Result<Value, String> {
    git_cmd::set_working_dir_from_request(req)?;
    let message = req
        .get("commitMessage")
        .and_then(|v| v.as_str())
        .ok_or_else(|| "request.commitMessage es obligatorio".to_string())?;
    if message.trim().is_empty() {
        return Err("commitMessage no puede estar vacío".into());
    }
    let add_all = req
        .get("addAll")
        .and_then(|v| v.as_bool())
        .unwrap_or(false);
    let files = req
        .get("files")
        .and_then(|v| v.as_array())
        .map(|a| {
            a.iter()
                .filter_map(|x| x.as_str().map(|s| s.to_string()))
                .collect::<Vec<_>>()
        })
        .unwrap_or_default();

    let commit_type = req
        .get("commitType")
        .and_then(|v| v.as_str())
        .unwrap_or("feat");
    let scope = req
        .get("scope")
        .and_then(|v| v.as_str())
        .unwrap_or("")
        .trim();

    let full_message = if scope.is_empty() {
        format!("{}: {}", commit_type, message.trim())
    } else {
        format!("{}({}): {}", commit_type, scope, message.trim())
    };

    if add_all {
        git_cmd::git(&["add", "-A"])?;
    } else if !files.is_empty() {
        let mut args: Vec<String> = vec!["add".into()];
        args.extend(files.iter().cloned());
        let rf: Vec<&str> = args.iter().map(|s| s.as_str()).collect();
        git_cmd::git(&rf)?;
    } else {
        return Err("Debe indicar addAll: true o files: [\"ruta\", ...]".into());
    }

    git_cmd::git(&["commit", "-m", &full_message])?;
    let abbrev = git_cmd::git(&["rev-parse", "--short", "HEAD"])
        .unwrap_or_default()
        .trim()
        .to_string();
    Ok(json!({
        "commitMessage": full_message,
        "headAbbrev": abbrev
    }))
}

fn cli_request() -> Result<Value, String> {
    let args: Vec<String> = env::args().collect();
    let mut message = String::new();
    let mut add_all = false;
    let mut files_csv = String::new();
    let mut i = 1;
    while i < args.len() {
        if (args[i] == "--message" || args[i] == "-m") && i + 1 < args.len() {
            message = args[i + 1].clone();
            i += 2;
            continue;
        }
        if args[i] == "--all" || args[i] == "-a" {
            add_all = true;
            i += 1;
            continue;
        }
        if (args[i] == "--files" || args[i] == "-f") && i + 1 < args.len() {
            files_csv = args[i + 1].clone();
            i += 2;
            continue;
        }
        i += 1;
    }
    if message.is_empty() {
        return Err("CLI: --message \"texto\" y (--all | --files a,b)".into());
    }
    if add_all {
        return Ok(json!({ "commitMessage": message, "addAll": true }));
    }
    if files_csv.is_empty() {
        return Err("CLI: especifique --all o --files".into());
    }
    let files: Vec<String> = files_csv
        .split(',')
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .collect();
    Ok(json!({ "commitMessage": message, "files": files }))
}

fn main() {
    let started = Instant::now();
    let entity_id = "git-save-snapshot";
    let (meta, req) = match capsule_json::load_or_cli(entity_id, cli_request) {
        Ok(x) => x,
        Err(e) => capsule_json::emit_parse_error(entity_id, e),
    };
    match handle(&req) {
        Ok(v) => capsule_json::emit(&meta, true, 0, "OK", Some(v), None, started),
        Err(s) => capsule_json::emit(&meta, false, 1, s, None, None, started),
    }
}
