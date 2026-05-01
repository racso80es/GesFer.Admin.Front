//! Skill git-create-pr: push opcional + `gh pr create`.

use gesfer_skills::capsule_json;
use gesfer_skills::git_cmd;
use serde_json::{json, Value};
use std::env;
use std::process::Command;
use std::time::Instant;

fn detect_default_base() -> String {
    if let Ok(out) = Command::new("git").args(["symbolic-ref", "refs/remotes/origin/HEAD"]).output() {
        if out.status.success() {
            let s = String::from_utf8_lossy(&out.stdout);
            if s.contains("main") {
                return "main".into();
            }
            if s.contains("master") {
                return "master".into();
            }
        }
    }
    "main".into()
}

fn handle(req: &Value) -> Result<Value, String> {
    git_cmd::set_working_dir_from_request(req)?;
    let push_first = req
        .get("pushFirst")
        .and_then(|v| v.as_bool())
        .unwrap_or(true);
    let remote = req
        .get("remote")
        .and_then(|v| v.as_str())
        .unwrap_or("origin");

    let mut branch = req
        .get("head")
        .and_then(|v| v.as_str())
        .map(|s| s.to_string())
        .unwrap_or_default();
    if branch.is_empty() {
        branch = git_cmd::git(&["branch", "--show-current"])?.trim().to_string();
    }
    if branch.is_empty() {
        return Err("No se pudo determinar la rama (head)".into());
    }

    let base = req
        .get("base")
        .and_then(|v| v.as_str())
        .map(|s| s.to_string())
        .filter(|s| !s.is_empty())
        .unwrap_or_else(detect_default_base);

    let title = req
        .get("title")
        .and_then(|v| v.as_str())
        .map(|s| s.to_string())
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| branch.clone());

    let body = req
        .get("body")
        .and_then(|v| v.as_str())
        .unwrap_or("")
        .to_string();

    if branch == base {
        return Err("head y base no deben coincidir para abrir PR".into());
    }

    if push_first {
        git_cmd::git(&["push", "-u", remote, &branch])?;
    }

    let st = Command::new("gh")
        .args([
            "pr",
            "create",
            "--base",
            &base,
            "--head",
            &branch,
            "--title",
            &title,
            "--body",
            &body,
        ])
        .status()
        .map_err(|e| format!("gh no disponible o error al invocar: {}", e))?;

    if !st.success() {
        return Err(format!(
            "gh pr create falló (código {})",
            st.code().unwrap_or(-1)
        ));
    }

    Ok(json!({
        "base": base,
        "head": branch,
        "title": title,
        "pushFirst": push_first
    }))
}

fn cli_request() -> Result<Value, String> {
    let args: Vec<String> = env::args().collect();
    let mut title = String::new();
    let mut body = String::new();
    let mut base: Option<String> = None;
    let mut head: Option<String> = None;
    let mut push_first = true;
    let mut i = 1;
    while i < args.len() {
        if (args[i] == "--title" || args[i] == "-t") && i + 1 < args.len() {
            title = args[i + 1].clone();
            i += 2;
            continue;
        }
        if (args[i] == "--body" || args[i] == "-b") && i + 1 < args.len() {
            body = args[i + 1].clone();
            i += 2;
            continue;
        }
        if args[i] == "--base" && i + 1 < args.len() {
            base = Some(args[i + 1].clone());
            i += 2;
            continue;
        }
        if args[i] == "--head" && i + 1 < args.len() {
            head = Some(args[i + 1].clone());
            i += 2;
            continue;
        }
        if args[i] == "--no-push" {
            push_first = false;
            i += 1;
            continue;
        }
        i += 1;
    }
    let mut v = json!({
        "title": if title.is_empty() { Value::Null } else { json!(title) },
        "body": body,
        "pushFirst": push_first
    });
    if let Some(b) = base {
        v.as_object_mut().unwrap().insert("base".into(), json!(b));
    }
    if let Some(h) = head {
        v.as_object_mut().unwrap().insert("head".into(), json!(h));
    }
    Ok(v)
}

fn main() {
    let started = Instant::now();
    let entity_id = "git-create-pr";
    let (meta, req) = match capsule_json::load_or_cli(entity_id, cli_request) {
        Ok(x) => x,
        Err(e) => capsule_json::emit_parse_error(entity_id, e),
    };
    match handle(&req) {
        Ok(v) => capsule_json::emit(&meta, true, 0, "OK", Some(v), None, started),
        Err(s) => capsule_json::emit(&meta, false, 1, s, None, None, started),
    }
}
