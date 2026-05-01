# git-workspace-recon

Cápsula: `paths.skillCapsules.git-workspace-recon` (Cúmulo).

## Invocación

- **JSON v2:** una línea JSON en stdout; entrada por stdin o `GESFER_CAPSULE_REQUEST`. Ver `SddIA/norms/capsule-json-io.md` y `gesfer_skills::capsule_json` (schema `2.0`).
- **CLI:** ejecutar sin stdin (o `GESFER_SKIP_STDIN=1`) — request vacío `{}` tras `workingDirectory` opcional vía JSON solo.

## Request (`request`)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `workingDirectory` | string (opcional) | Repo Git a inspeccionar |

## Build

Desde `paths.skillsRustPath`: `.\install.ps1` copia `git_workspace_recon.exe` a `bin/`.
