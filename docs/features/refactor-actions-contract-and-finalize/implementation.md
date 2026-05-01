---
id: refactor-actions-contract-and-finalize-implementation
action_id: implementation
feature_id: refactor-actions-contract-and-finalize
title: "Touchpoints de implementación"
date: "2026-05-01"
status: draft
touchpoints:
  - path: SddIA/actions/actions-contract.md
    change: "Norma innegociable; lista de action_id actualizada."
  - path: SddIA/actions/actions-contract.json
    change: "Sincronizar action_id con contrato MD."
  - path: SddIA/actions/finalize-process/
    change: "Nueva ubicación (rename desde finalize/); spec sin script refs."
  - path: scripts/actions/finalize/
    change: "Eliminar o deprecar si la acción ya no los invoca."
  - path: SddIA/process/
    change: "Todos los spec.md/spec.json con related_actions."
  - path: SddIA/norms/
    change: "interaction-triggers, features-documentation-frontmatter, git-via-skills, commands-via-skills, pr-acceptance, entidades-dominio."
  - path: SddIA/agents/cumulo.json
    change: "process_interface / listas finalize-process."
  - path: AGENTS.md
    change: "Tablas de acciones y procesos."
  - path: .cursor/rules/
    change: "action-suggestions, process-suggestions, features-documentation si mencionan finalize."
  - path: SddIA/skills/git-operations/
    change: "Referencias a acción de cierre."
  - path: SddIA/templates/
    change: "related_actions en plantillas."
items:
  - id: IMP-1
    description: "Escribir contrato de no-ejecución directa en actions-contract.md"
  - id: IMP-2
    description: "Renombrar acción y purgar Invoke-Finalize / cargo desde spec de acción"
  - id: IMP-3
    description: "Actualizar consumidores (grep finalize) → finalize-process"
---

# Implementación (documento de touchpoints)

Este documento lista los archivos que deben mutar en la fase de ejecución (6). Los agentes Tekton deben marcar cada ítem en `execution.md` al aplicar cambios.

## Inventario inicial (descubrimiento)

Referencias representativas a `finalize` detectadas en: `SddIA/process/**/spec.md`, `SddIA/process/**/spec.json`, `SddIA/norms/interaction-triggers.md`, `SddIA/norms/features-documentation-frontmatter.md`, `SddIA/actions/README.md`, `SddIA/actions/finalize/spec.md`, `AGENTS.md`, `.cursor/rules/action-suggestions.mdc`, `SddIA/skills/git-operations/spec.md`, plantillas bajo `SddIA/templates/`, `SddIA/agents/cumulo.json`.

## Notas

- Tras renombrar la carpeta de la acción, actualizar **`SddIA/actions/README.md`** y cualquier enlace relativo `paths.actionsPath/finalize/` → `finalize-process/`.
- Si se mantiene un alias temporal `finalize` en JSON por compatibilidad, documentarlo en `spec.md` de la feature como deuda explícita a retirar; **preferido:** migración limpia sin alias.
