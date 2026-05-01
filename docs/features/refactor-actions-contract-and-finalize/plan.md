---
id: refactor-actions-contract-and-finalize-plan
action_id: planning
feature_id: refactor-actions-contract-and-finalize
title: "Plan de implementación"
date: "2026-05-01"
status: draft
phases:
  - id: P1
    name: Contrato y catálogo
    tasks:
      - "Editar SddIA/actions/actions-contract.md con norma de orquestación exclusiva."
      - "Actualizar SddIA/actions/actions-contract.json (action_id: añadir finalize-process, retirar finalize si aplica)."
  - id: P2
    name: Acción finalize-process
    tasks:
      - "Renombrar carpeta SddIA/actions/finalize → finalize-process."
      - "Reescribir spec.md (y spec.json si existe): triggers, sin scripts; solo skills Git + sddia-evolution-register."
      - "Eliminar o desactivar scripts bajo scripts/actions/finalize/ si ya no son contrato (o dejar obsoletos con README; preferir eliminación si no hay dependencias)."
  - id: P3
    name: Saneamiento referencias
    tasks:
      - "Grep finalize en SddIA/, docs/, .cursor/, AGENTS.md; actualizar a finalize-process donde sea action_id o related_actions."
      - "Ajustar normas de frontmatter (finalize.md → finalize-process.md si el contrato lo fija)."
  - id: P4
    name: Validación y cierre
    tasks:
      - "validacion.md: checklist de búsqueda residual finalize (excepciones documentadas)."
      - "Si muta SddIA/: sddia_evolution_register + git-save-snapshot; git-sync-remote; git-create-pr con resumen."
tasks:
  - "P1–P4 ejecutados con commits atómicos vía git-save-snapshot."
---

# Plan

## Orden recomendado

1. **Contrato** primero (`actions-contract.*`) para fijar la ley antes del catálogo de carpetas.
2. **Mover y reescribir** la acción de cierre.
3. **Barrido** de referencias en procesos, normas, agentes, reglas IDE.
4. **Validación** y fase 8 del proceso feature (evolution register si aplica).

## Commits sugeridos (atómicos)

1. `docs: feature refactor-actions-contract-and-finalize objectives/spec/plan/implementation`
2. `feat(sddia): actions-contract — solo orquestación skills/tools`
3. `refactor(sddia): finalize → finalize-process sin scripts directos`
4. `chore(sddia): referencias finalize → finalize-process en procesos y normas`
5. `chore: evolution register + sync` (si aplica)

## Dependencias

- Cúmulo `paths.featurePath` para esta documentación.
- Skills existentes en `paths.skillCapsules` para cerrar sin nuevos binarios.
