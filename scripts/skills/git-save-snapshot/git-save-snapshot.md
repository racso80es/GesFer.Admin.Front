# git-save-snapshot

Cápsula: `paths.skillCapsules.git-save-snapshot`.

## Request

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `commitMessage` | string | Obligatorio |
| `addAll` | bool | `git add -A` |
| `files` | string[] | Rutas para `git add` (mutuamente excluyente con addAll en lógica de negocio) |
| `commitType` | string | Default `feat` (prefijo Conventional Commits) |
| `scope` | string | Opcional |

## CLI

`Git-Save-Snapshot.bat --message "msg" --all` o `--files "a.md,b.md"`
