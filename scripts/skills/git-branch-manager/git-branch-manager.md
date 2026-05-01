# git-branch-manager

Cápsula: `paths.skillCapsules.git-branch-manager`.

## Request

| Campo | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `branchName` | string | — | Obligatorio |
| `create` | bool | false | `git checkout -b` si true |
| `checkout` | bool | true | Si no `create`, checkout a rama existente; si false y no `create`, solo `git branch` |

## CLI

`Git-Branch-Manager.bat --branch-name feat/x [--create]`
