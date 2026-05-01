//! Skill git-tactical-retreat: reset duro / limpieza con confirmación explícita (Visión Zero).

use gesfer_skills::capsule_json;
use gesfer_skills::git_cmd;
use serde_json::{json, Value};
use std::env;
use std::time::Instant;

fn handle(req: &Value) -> Result<Value, String> {
    git_cmd::set_working_dir_from_request(req)?;
    let hard = req
        .get("hardReset")
        .and_then(|v| v.as_bool())
        .unwrap_or(false);
    let discard = req
        .get("discardWorkingTree")
        .and_then(|v| v.as_bool())
        .unwrap_or(false);
    let confirm = req
        .get("confirmDestructive")
        .and_then(|v| v.as_bool())
        .unwrap_or(false);

    if (hard || discard) && !confirm {
        return Err(
            "Visión Zero: operación destructiva; establezca confirmDestructive: true".into(),
        );
    }

    let target = req
        .get("targetRef")
        .and_then(|v| v.as_str())
        .unwrap_or("HEAD");
    let stash_first = req
        .get("stashFirst")
        .and_then(|v| v.as_bool())
        .unwrap_or(true);

    if stash_first && (hard || discard) {
        let _ = git_cmd::git(&["stash", "push", "-u", "-m", "git-tactical-retreat"]);
    }

    if hard && target != "HEAD" {
        git_cmd::git(&["fetch", "--all"])?;
    }

    if hard {
        git_cmd::git(&["reset", "--hard", target])?;
    } else if discard {
        git_cmd::git(&["reset", "--hard", "HEAD"])?;
        git_cmd::git(&["clean", "-fd"])?;
    } else {
        return Err("Indique hardReset: true y/o discardWorkingTree: true".into());
    }

    let branch = git_cmd::git(&["branch", "--show-current"])
        .unwrap_or_default()
        .trim()
        .to_string();
    Ok(json!({
        "hardReset": hard,
        "discardWorkingTree": discard,
        "targetRef": target,
        "currentBranch": branch
    }))
}

fn cli_request() -> Result<Value, String> {
    let args: Vec<String> = env::args().collect();
    let mut hard = false;
    let mut discard = false;
    let mut confirm = false;
    let mut target = "HEAD".to_string();
    let mut i = 1;
    while i < args.len() {
        if args[i] == "--hard" {
            hard = true;
            i += 1;
            continue;
        }
        if args[i] == "--discard" {
            discard = true;
            i += 1;
            continue;
        }
        if args[i] == "--confirm-destructive" {
            confirm = true;
            i += 1;
            continue;
        }
        if (args[i] == "--target" || args[i] == "--target-ref") && i + 1 < args.len() {
            target = args[i + 1].clone();
            i += 2;
            continue;
        }
        i += 1;
    }
    if !hard && !discard {
        return Err("CLI: use --hard y/o --discard con --confirm-destructive".into());
    }
    if !confirm {
        return Err("CLI: --confirm-destructive obligatorio".into());
    }
    Ok(json!({
        "hardReset": hard,
        "discardWorkingTree": discard,
        "confirmDestructive": true,
        "targetRef": target
    }))
}

fn main() {
    let started = Instant::now();
    let entity_id = "git-tactical-retreat";
    let (meta, req) = match capsule_json::load_or_cli(entity_id, cli_request) {
        Ok(x) => x,
        Err(e) => capsule_json::emit_parse_error(entity_id, e),
    };
    match handle(&req) {
        Ok(v) => capsule_json::emit(&meta, true, 0, "OK", Some(v), None, started),
        Err(s) => capsule_json::emit(&meta, false, 1, s, None, None, started),
    }
}
