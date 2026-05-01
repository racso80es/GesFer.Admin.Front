# git-tactical-retreat

Cápsula: `paths.skillCapsules.git-tactical-retreat`.

**Visión Zero:** cualquier operación destructiva exige `confirmDestructive: true`.

## Request

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `hardReset` | bool | `git reset --hard` a `targetRef` |
| `discardWorkingTree` | bool | `reset --hard HEAD` + `clean -fd` |
| `confirmDestructive` | bool | Obligatorio si aplica destructive |
| `targetRef` | string | Default `HEAD`; si distinto, se hace `fetch --all` antes del reset |
| `stashFirst` | bool | Default true si hay destructive |

## CLI

`Git-Tactical-Retreat.bat --hard [--target origin/main] --confirm-destructive` o `--discard --confirm-destructive`
