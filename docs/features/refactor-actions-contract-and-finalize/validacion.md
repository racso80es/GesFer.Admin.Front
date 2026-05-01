---
id: refactor-actions-contract-and-finalize-validacion
action_id: validate
feature_id: refactor-actions-contract-and-finalize
title: "Validación pre-PR — refactor acciones y finalize-process"
date: "2026-05-01"
status: done
global: pass
git_changes_summary: |
  SddIA/actions: actions-contract endurecido; finalize/ eliminado; finalize-process/ nuevo;
  procesos, normas, plantillas, cumulo, skills/git-operations, .cursor/rules, AGENTS.norms actualizados;
  scripts/skills/run-capsule-from-tekton-request.ps1; .gitignore .tekton_request.json
checks:
  - id: CHK-REF
    description: "Referencias action_id finalize sustituidas por finalize-process en SddIA (salvo nota histórica en spec finalize-process)"
    result: pass
  - id: CHK-SCRIPT
    description: "Acción finalize-process no prescribe Invoke-Finalize.ps1 ni scripts OS"
    result: pass
  - id: CHK-WRAPPER
    description: "Wrapper Tekton + GESFER_CAPSULE_REQUEST documentado en actions-contract y script PS1"
    result: pass
---

# Validación

- **Alcance:** Mutación documental y de contrato bajo `SddIA/`, más wrapper en `scripts/skills/` y reglas IDE.
- **Riesgo residual:** Binarios `.exe` de cápsulas no versionados (`.gitignore`); validar en máquina local con `run-capsule-from-tekton-request.ps1`.
- **PR:** Cuerpo debe incluir este resumen y enlace a `objectives.md`.
