# git-close-cycle

Cápsula: `paths.skillCapsules.git-close-cycle`.

## Request

| Campo | Tipo | Default |
|-------|------|---------|
| `targetBranch` | string | (obligatorio) |
| `remote` | string | `origin` |
| `workingDirectory` | string | — |

## CLI

`Git-Close-Cycle.bat --target-branch <rama> [--remote origin]`

## Envelope v2

`meta.entityId`: `git-close-cycle`. Invocación recomendada vía `scripts/skills/run-capsule-from-tekton-request.ps1` y `.tekton_request.json` (`capsuleRequestRaw` / `executable`).
