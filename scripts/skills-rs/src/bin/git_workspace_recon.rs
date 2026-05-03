//! Skill git-workspace-recon: inspección rápida del workspace Git (JSON v2 + CLI vacío).

use gesfer_skills::capsule_json;
use gesfer_skills::git_cmd;
use serde_json::{json, Value};
use std::time::Instant;

fn handle(req: &Value) -> Result<Value, String> {
    git_cmd::set_working_dir_from_request(req)?;
    let root = match git_cmd::git(&["rev-parse", "--show-toplevel"]) {
        Ok(s) => s.trim().to_string(),
        Err(e) => return Err(e),
    };
    let branch = git_cmd::git(&["branch", "--show-current"])
        .unwrap_or_default()
        .trim()
        .to_string();
    let status = git_cmd::git(&["status", "--porcelain"]).unwrap_or_default();
    let remote = git_cmd::git(&["remote", "-v"]).unwrap_or_default();
    let last = git_cmd::git(&["log", "-1", "--oneline"])
        .unwrap_or_default()
        .trim()
        .to_string();
    let abbrev = git_cmd::git(&["rev-parse", "--short", "HEAD"])
        .unwrap_or_default()
        .trim()
        .to_string();
    Ok(json!({
        "repositoryRoot": root,
        "branch": branch,
        "headAbbrev": abbrev,
        "statusPorcelain": status,
        "remotesText": remote,
        "lastCommitOneline": last
    }))
}

fn cli_request() -> Result<Value, String> {
    Ok(json!({}))
}

fn main() {
    let started = Instant::now();
    let entity_id = "git-workspace-recon";
    let (meta, req) = match capsule_json::load_or_cli(entity_id, cli_request) {
        Ok(x) => x,
        Err(e) => capsule_json::emit_parse_error(entity_id, e),
    };
    match handle(&req) {
        Ok(v) => capsule_json::emit(&meta, true, 0, "OK", Some(v), None, started),
        Err(s) => capsule_json::emit(&meta, false, 1, s, None, None, started),
    }
}
