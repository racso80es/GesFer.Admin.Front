# git-create-pr

Cápsula: `paths.skillCapsules.git-create-pr`.

## Request

| Campo | Tipo | Default |
|-------|------|---------|
| `pushFirst` | bool | true (`git push -u`) |
| `remote` | string | `origin` |
| `head` | string | rama actual |
| `base` | string | detectada (`main` / `master`) |
| `title` | string | nombre de rama |
| `body` | string | vacío |

## CLI

`Git-Create-PR.bat [--title t] [--body b] [--base main] [--head feat-x] [--no-push]`

Requiere `gh` autenticado (`gh auth status`).
