---
id: create-skill-git-close-cycle-spec
action_id: spec
feature_id: create-skill-git-close-cycle
title: Especificación técnica — git-close-cycle
date: "2026-05-01"
status: in_progress
scope: Skill Rust + cápsula + registro Cúmulo; contrato finalize-process
acceptance_criteria:
  - Binario git_close_cycle con envelope v2 y CLI --target-branch
  - skillCapsules.git-close-cycle en cumulo.paths.json
  - finalize-process orquesta git-close-cycle como último paso con rama de trabajo
---

# Especificación

## Skill `git-close-cycle`

- **Entrada obligatoria:** `targetBranch` (string); aceptar alias `target_branch` en JSON plano.
- **Remoto:** `origin` por defecto; `git fetch --prune` sobre ese remoto.
- **Rama de integración:** resolver con `git symbolic-ref refs/remotes/<remote>/HEAD`; si falla, preferir `main`, luego `master`.
- **No-op seguro:** si `targetBranch` es la rama de integración, salir OK con `skipped`.
- **Borrado:** `git branch -d`; si error, `git branch -D`. Si la rama local no existe, no fallar (resultado `deleted: false`).

## Acción `finalize-process`

- Al ejecutarse por disparadores tipo «tarea finalizada», el ejecutor debe **registrar el nombre de la rama de trabajo** (feat/fix) **antes** de mutar HEAD si aplica, y como **último paso** invocar la cápsula **git-close-cycle** con ese nombre en `targetBranch`, tras **git-create-pr**.

## Trazabilidad Git

Toda invocación por agentes vía **`.tekton_request.json`** + `run-capsule-from-tekton-request.ps1` (o variable `GESFER_CAPSULE_REQUEST`), no comandos git sueltos.
