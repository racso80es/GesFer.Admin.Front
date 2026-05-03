//! Skill git-close-cycle: cierre local del ciclo (checkout integración, pull, fetch --prune, borrar rama de trabajo).

use gesfer_skills::capsule_json;
use gesfer_skills::git_cmd;
use serde_json::{json, Value};
use std::env;
use std::time::Instant;

fn target_from_req(req: &Value) -> Result<String, String> {
    let s = req
        .get("targetBranch")
        .or_else(|| req.get("target_branch"))
        .and_then(|v| v.as_str())
        .map(str::trim)
        .filter(|s| !s.is_empty())
        .map(|s| s.to_string());
    match s {
        Some(t) => Ok(t),
        None => Err("request.targetBranch (string) es obligatorio".into()),
    }
}

fn resolve_integration_branch(remote: &str) -> Result<String, String> {
    let sym = format!("refs/remotes/{}/HEAD", remote);
    let (code, out, _) = git_cmd::git_output(&["symbolic-ref", &sym])?;
    if code == 0 {
        let prefix = format!("refs/remotes/{}/", remote);
        let t = out.trim();
        if let Some(name) = t.strip_prefix(&prefix) {
            return Ok(name.to_string());
        }
    }
    let (c, _, _) = git_cmd::git_output(&["rev-parse", "--verify", "refs/heads/main"])?;
    if c == 0 {
        return Ok("main".into());
    }
    Ok("master".into())
}

fn branch_exists_local(name: &str) -> Result<bool, String> {
    let (c, _, _) =
        git_cmd::git_output(&["rev-parse", "--verify", &format!("refs/heads/{}", name)])?;
    Ok(c == 0)
}

fn handle(req: &Value) -> Result<Value, String> {
    git_cmd::set_working_dir_from_request(req)?;
    let remote = req
        .get("remote")
        .and_then(|v| v.as_str())
        .unwrap_or("origin");
    let target = target_from_req(req)?;
    let integration = resolve_integration_branch(remote)?;

    if target == integration {
        return Ok(json!({
            "skipped": true,
            "reason": "target_branch_is_integration_branch",
            "integrationBranch": integration,
            "remote": remote
        }));
    }

    git_cmd::git(&["checkout", &integration])?;
    git_cmd::git(&["pull", remote, "HEAD"])?;
    git_cmd::git(&["fetch", "--prune", remote])?;

    let existed = branch_exists_local(&target)?;
    let mut deleted = false;
    let mut delete_mode: Option<&str> = None;
    if existed {
        if git_cmd::git(&["branch", "-d", &target]).is_ok() {
            deleted = true;
            delete_mode = Some("-d");
        } else {
            git_cmd::git(&["branch", "-D", &target])?;
            deleted = true;
            delete_mode = Some("-D");
        }
    }

    let current = git_cmd::git(&["branch", "--show-current"])
        .unwrap_or_default()
        .trim()
        .to_string();

    Ok(json!({
        "remote": remote,
        "targetBranch": target,
        "integrationBranch": integration,
        "localBranchExisted": existed,
        "deleted": deleted,
        "deleteMode": delete_mode,
        "currentBranchAfter": current
    }))
}

fn cli_request() -> Result<Value, String> {
    let args: Vec<String> = env::args().collect();
    let mut target = String::new();
    let mut remote: Option<String> = None;
    let mut i = 1;
    while i < args.len() {
        if (args[i] == "--target-branch" || args[i] == "--targetBranch") && i + 1 < args.len() {
            target = args[i + 1].clone();
            i += 2;
            continue;
        }
        if (args[i] == "--remote" || args[i] == "-r") && i + 1 < args.len() {
            remote = Some(args[i + 1].clone());
            i += 2;
            continue;
        }
        i += 1;
    }
    if target.is_empty() {
        return Err(
            "CLI: use --target-branch <nombre> [--remote origin]. O envelope JSON v2 por stdin."
                .into(),
        );
    }
    let mut v = json!({ "targetBranch": target });
    if let Some(r) = remote {
        v.as_object_mut().unwrap().insert("remote".into(), json!(r));
    }
    Ok(v)
}

fn main() {
    let started = Instant::now();
    let entity_id = "git-close-cycle";
    let (meta, req) = match capsule_json::load_or_cli(entity_id, cli_request) {
        Ok(x) => x,
        Err(e) => capsule_json::emit_parse_error(entity_id, e),
    };
    match handle(&req) {
        Ok(v) => capsule_json::emit(&meta, true, 0, "OK", Some(v), None, started),
        Err(s) => capsule_json::emit(&meta, false, 1, s, None, None, started),
    }
}
