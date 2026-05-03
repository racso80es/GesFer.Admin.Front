//! Skill git-branch-manager: crear y/o cambiar de rama.

use gesfer_skills::capsule_json;
use gesfer_skills::git_cmd;
use serde_json::{json, Value};
use std::env;
use std::time::Instant;

fn handle(req: &Value) -> Result<Value, String> {
    git_cmd::set_working_dir_from_request(req)?;
    let branch = req
        .get("branchName")
        .and_then(|v| v.as_str())
        .ok_or_else(|| "request.branchName (string) es obligatorio".to_string())?;
    if branch.trim().is_empty() {
        return Err("branchName no puede estar vacío".into());
    }
    let create = req
        .get("create")
        .and_then(|v| v.as_bool())
        .unwrap_or(false);
    let checkout = req
        .get("checkout")
        .and_then(|v| v.as_bool())
        .unwrap_or(true);

    if create {
        git_cmd::git(&["checkout", "-b", branch.trim()])?;
    } else if checkout {
        git_cmd::git(&["checkout", branch.trim()])?;
    } else {
        git_cmd::git(&["branch", branch.trim()])?;
    }

    let current = git_cmd::git(&["branch", "--show-current"])
        .unwrap_or_default()
        .trim()
        .to_string();
    Ok(json!({
        "branchName": branch.trim(),
        "create": create,
        "checkout": checkout,
        "currentBranchAfter": current
    }))
}

fn cli_request() -> Result<Value, String> {
    let args: Vec<String> = env::args().collect();
    let mut branch = String::new();
    let mut create = false;
    let mut i = 1;
    while i < args.len() {
        if (args[i] == "--branch-name" || args[i] == "--branchName") && i + 1 < args.len() {
            branch = args[i + 1].clone();
            i += 2;
            continue;
        }
        if args[i] == "--create" {
            create = true;
            i += 1;
            continue;
        }
        i += 1;
    }
    if branch.is_empty() {
        return Err(
            "CLI: use --branch-name <nombre> [--create]. O envíe envelope JSON v2 por stdin.".into(),
        );
    }
    Ok(json!({ "branchName": branch, "create": create }))
}

fn main() {
    let started = Instant::now();
    let entity_id = "git-branch-manager";
    let (meta, req) = match capsule_json::load_or_cli(entity_id, cli_request) {
        Ok(x) => x,
        Err(e) => capsule_json::emit_parse_error(entity_id, e),
    };
    match handle(&req) {
        Ok(v) => capsule_json::emit(&meta, true, 0, "OK", Some(v), None, started),
        Err(s) => capsule_json::emit(&meta, false, 1, s, None, None, started),
    }
}
