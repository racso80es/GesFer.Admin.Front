---
id: refactor-actions-contract-and-finalize-objectives
action_id: objectives
feature_id: refactor-actions-contract-and-finalize
title: "Refactor del contrato de acciones y metamorfosis finalize → finalize-process"
date: "2026-05-01"
status: done
branch: feat/refactor-actions-contract-and-finalize
scope: |
  Contrato de acciones (solo orquestación skills/tools), renombrado de la acción de cierre,
  eliminación de ejecución directa de scripts OS en esa acción, saneamiento de referencias en SddIA.
ley_aplicada: "Ley COMANDOS (AGENTS.md): acciones orquestan skills/tools; no comandos/shell directos."
---

# Objetivos

## Objetivo

Endurecer el contrato documental y operativo de las **acciones** en SddIA para que su única jurisdicción sea **orquestar skills y herramientas registradas** (Cúmulo), sin ejecutar código del sistema operativo ni scripts (`.ps1`, `.bat`, invocaciones shell) desde la definición o el flujo de la acción. En paralelo, **renombrar** la acción **`finalize`** a **`finalize-process`**, alinear disparadores semánticos al cierre de proceso/tarea, y **delegar** toda la mecánica Git (push, PR, etc.) en las **macro-operativas** ya definidas como skills (`git-sync-remote`, `git-create-pr`, `git-save-snapshot`, `invoke-commit`, etc.), eliminando referencias a scripts orquestadores directos.

## Alcance

- **`SddIA/actions/actions-contract.md`** (y **`actions-contract.json`** si debe reflejar el catálogo): norma innegociable de orquestación exclusiva vía skills/tools registradas.
- **Carpeta de acción:** renombrar `SddIA/actions/finalize/` → `SddIA/actions/finalize-process/`; actualizar `spec.md` / metadatos; retirar `implementation_script_ref` y pasos que invoquen `.ps1` / cargo directo; describir solo orquestación de skills del Arsenal Git y, donde aplique, `sddia-evolution-register`.
- **Consumidores:** todos los **`paths.processPath/**`**, plantillas, normas, agentes (p. ej. `AGENTS.md`, `.cursor/rules`, `interaction-triggers.md`, `features-documentation-frontmatter.md`, `cumulo.json`) que citen `finalize` como `action_id` o en listas `related_actions`.
- **Documentación de tarea:** esta carpeta (`paths.featurePath/refactor-actions-contract-and-finalize/`) como SSOT del ciclo; artefactos `finalize.md` del proceso pueden renombrarse a **`finalize-process.md`** cuando el contrato de frontmatter lo actualice (coherencia con la acción renombrada).

## Fuera de alcance (explícito)

- Rediseñar la implementación Rust de skills existentes salvo que sea imprescindible para eliminar una referencia obsoleta.
- Cambiar el comportamiento funcional de `git-sync-remote` / `git-create-pr` más allá de documentar que `finalize-process` las orquesta.

## Preparación de entorno (fase 0)

- **Recon:** validar working tree limpio y rama base antes de ramificar. *Nota de ejecución:* la cápsula `git-workspace-recon` (binario) no completó en el entorno del agente; se validó equivalencia mínima con `git status --porcelain -b` (rama `main`, sin cambios pendientes en el momento previo a ramificar).
- **Rama:** `feat/refactor-actions-contract-and-finalize` creada desde `main`.

## Criterio de éxito

- Ninguna acción bajo `SddIA/actions/` documenta ejecución directa de shell, `.ps1`, `.bat` o comandos OS como paso normativo; solo orquestación de skills/tools.
- El identificador canónico de la acción de cierre es **`finalize-process`** en catálogos, procesos y normas.
- Referencias residual `finalize` (salvo historial o redirecciones documentales explícitas) eliminadas o actualizadas.
