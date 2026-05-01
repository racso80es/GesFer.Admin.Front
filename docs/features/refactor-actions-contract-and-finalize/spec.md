---
id: refactor-actions-contract-and-finalize-spec
action_id: spec
feature_id: refactor-actions-contract-and-finalize
title: "Especificación: contrato de acciones y finalize-process"
date: "2026-05-01"
status: draft
scope: SddIA/actions, SddIA/process, SddIA/norms, agentes y reglas difundidas
acceptance_criteria:
  - "actions-contract.md establece prohibición explícita de ejecución OS/scripts en acciones; solo orquestación de skills/tools registradas."
  - "Existe acción finalize-process (carpeta y spec) con triggers de cierre de proceso/tarea; sin implementation_script_ref ni Invoke-*.ps1."
  - "related_actions y textos en processPath, templates, norms, AGENTS, .cursor/rules referencian finalize-process donde antes finalize."
  - "Paridad razonable entre actions-contract.md y actions-contract.json (lista action_id coherente)."
---

# Especificación técnica

## 1. Contrato de acciones (`actions-contract.md`)

Añadir o reforzar una sección **«Alcance de ejecución»** (o equivalente) que establezca:

1. Una **acción** describe propósito, entradas, salidas, precondiciones y **el orden o la política de invocación** de skills y/o tools definidas en Cúmulo (`paths.skillCapsules`, `paths.toolCapsules`, `paths.skillsDefinitionPath`, `paths.toolsDefinitionPath`).
2. **Prohibido:** incluir como requisito de cumplimiento la ejecución directa de:
   - comandos del sistema operativo (incl. `git`, `npm`, `dotnet`, `cargo`, `pwsh`, etc.) desde el texto de la acción salvo como **cita ilustrativa** claramente marcada como ejemplo para el operador humano;
   - scripts `.ps1`, `.bat`, `.cmd`, binarios arbitrarios no catalogados como skill/tool del ecosistema.
3. **Permitido:** nombrar **skill_id** / **tool_id** y referenciar la cápsula vía Cúmulo; el ejecutor (humano o agente) invoca esas cápsulas según `SddIA/norms/commands-via-skills-or-tools.md`.

## 2. Acción `finalize-process` (sustituye `finalize`)

| Aspecto | Requisito |
|--------|-----------|
| **action_id** | `finalize-process` |
| **Nombre legible** | Cierre de proceso / finalización de tarea |
| **Triggers (documentales)** | Frases y disparadores alineados a: proceso finalizado, tarea finalizada, cierre S+, publicación post-validación |
| **Orquestación Git** | Únicamente vía skills: p. ej. `git-save-snapshot` / `invoke-commit` para consolidación; `git-sync-remote`; `git-create-pr`; si muta `SddIA/`, `sddia-evolution-register` + snapshot adicional, según proceso feature v2 |
| **Eliminar** | `implementation_script_ref`, flujos que mandaten `Invoke-Finalize.ps1`, `Finalizar-Proceso.ps1`, `cargo run` como paso de la acción (si el verify debe vivir en skill dedicada, referenciar skill, no comando crudo) |

## 3. Migración de referencias

- **Procesos:** `feature`, `bug-fix`, `refactorization`, `create-tool`, `create-skill`, `create-template`, `correccion-auditorias`, `automatic_task` / `automatic-task`, `validate-pull-requests`, etc.: actualizar listas y narrativa `finalize` → `finalize-process`.
- **Normas:** `features-documentation-frontmatter.md`, `interaction-triggers.md`, `git-via-skills-or-process.md`, `commands-via-skills-or-tools.md`, `pr-acceptance-protocol.md`, `entidades-dominio-ecosistema-sddia.md` según contengan el token de acción.
- **Agentes / Cúmulo:** `cumulo.json` (`process_interface`, listas de artefactos), tablas en `AGENTS.md`, reglas `.cursor/rules` (p. ej. `action-suggestions.mdc`).
- **Skills de definición:** `git-operations/spec.md` — actualizar mapeos que hablen de la acción `finalize`.
- **Artefacto de tarea:** donde el contrato diga `finalize.md`, valorar `finalize-process.md` y `action_id: finalize-process` en frontmatter para nuevas tareas (migración documentada en contrato).

## 4. Riesgos

- **Rotura de enlaces:** rutas `SddIA/actions/finalize/` en documentación externa; mitigación: búsqueda global y actualización en el mismo PR.
- **Paridad MD/JSON:** mantener `actions-contract.json` alineado con el markdown para consumo automático.
