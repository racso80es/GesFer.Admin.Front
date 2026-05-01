//! Skill git-sync-remote: fetch / pull / push con origin.

use gesfer_skills::capsule_json;
use gesfer_skills::git_cmd;
use serde_json::{json, Value};
use std::env;
use std::time::Instant;

fn handle(req: &Value) -> Result<Value, String> {
    git_cmd::set_working_dir_from_request(req)?;
    let remote = req
        .get("remote")
        .and_then(|v| v.as_str())
        .unwrap_or("origin");
    let do_fetch = req
        .get("fetch")
        .and_then(|v| v.as_bool())
        .unwrap_or(true);
    let do_pull = req
        .get("pull")
        .and_then(|v| v.as_bool())
        .unwrap_or(true);
    let do_push = req
        .get("push")
        .and_then(|v| v.as_bool())
        .unwrap_or(false);
    let branch = req
        .get("branch")
        .and_then(|v| v.as_str())
        .map(|s| s.to_string())
        .unwrap_or_else(|| {
            git_cmd::git(&["branch", "--show-current"])
                .unwrap_or_default()
                .trim()
                .to_string()
        });
    if branch.is_empty() {
        return Err("No se pudo determinar la rama (request.branch o HEAD)".into());
    }

    if do_fetch {
        git_cmd::git(&["fetch", remote])?;
    }
    if do_pull {
        git_cmd::git(&["pull", remote, &branch])?;
    }
    if do_push {
        git_cmd::git(&["push", remote, &branch])?;
    }

    Ok(json!({
        "remote": remote,
        "branch": branch,
        "fetch": do_fetch,
        "pull": do_pull,
        "push": do_push
    }))
}

fn cli_request() -> Result<Value, String> {
    let args: Vec<String> = env::args().collect();
    let mut remote = "origin".to_string();
    let mut fetch = true;
    let mut pull = true;
    let mut push = false;
    let mut branch: Option<String> = None;
    let mut i = 1;
    while i < args.len() {
        if (args[i] == "--remote" || args[i] == "-r") && i + 1 < args.len() {
            remote = args[i + 1].clone();
            i += 2;
            continue;
        }
        if (args[i] == "--branch" || args[i] == "-b") && i + 1 < args.len() {
            branch = Some(args[i + 1].clone());
            i += 2;
            continue;
        }
        if args[i] == "--no-fetch" {
            fetch = false;
            i += 1;
            continue;
        }
        if args[i] == "--no-pull" {
            pull = false;
            i += 1;
            continue;
        }
        if args[i] == "--push" {
            push = true;
            i += 1;
            continue;
        }
        i += 1;
    }
    let mut v = json!({
        "remote": remote,
        "fetch": fetch,
        "pull": pull,
        "push": push
    });
    if let Some(b) = branch {
        v.as_object_mut().unwrap().insert("branch".into(), json!(b));
    }
    Ok(v)
}

fn main() {
    let started = Instant::now();
    let entity_id = "git-sync-remote";
    let (meta, req) = match capsule_json::load_or_cli(entity_id, cli_request) {
        Ok(x) => x,
        Err(e) => capsule_json::emit_parse_error(entity_id, e),
    };
    match handle(&req) {
        Ok(v) => capsule_json::emit(&meta, true, 0, "OK", Some(v), None, started),
        Err(s) => capsule_json::emit(&meta, false, 1, s, None, None, started),
    }
}
