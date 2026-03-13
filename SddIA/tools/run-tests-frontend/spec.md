---
contract_ref: SddIA/tools/tools-contract.json
cumulo_ref: SddIA/agents/cumulo.json
depends_on_tools: []
env:
  - Windows 11
  - PowerShell 7+
  - Node.js 20+
implementation_path_ref: paths.toolCapsules.run-tests-frontend
inputs:
  BaseUrl: string (opcional). URL base frontend para E2E; por defecto http://localhost:3001.
  OnlyTests: boolean (opcional). Solo ejecutar tests (sin npm install).
  OutputJson: boolean (opcional). Emitir resultado JSON por stdout.
  OutputPath: string (opcional). Fichero donde escribir el resultado JSON.
  TestScope: string (opcional). unit | e2e | build | lint | all. Por defecto all.
output:
  data_fields: tests_summary (scope, exit codes), duration_ms
  phases_feedback:
    - init
    - install
    - lint
    - build
    - unit
    - e2e
    - done
    - error
  schema_ref: tools-contract.json output.required_fields y optional_fields
toolId: run-tests-frontend
version: 1.0.0
---
# Especificación: run-tests-frontend

**toolId:** `run-tests-frontend`
**Definición (SddIA):** Este directorio (paths.toolsDefinitionPath/run-tests-frontend/).
**Implementación (scripts):** Ruta canónica en Cúmulo → **implementation_path_ref:** `paths.toolCapsules.run-tests-frontend`.

## Objetivo

Ejecutar tests del frontend (unitarios, E2E, build, lint) en condiciones de validación local sin invocar comandos npm directamente desde el agente. Ejecuta los scripts npm correspondientes en `src/` según el alcance indicado.

## Entradas

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| TestScope | string | unit, e2e, build, lint, all (por defecto all). |
| OnlyTests | switch | Solo ejecutar tests (sin npm install previo). |
| BaseUrl | string | URL base del frontend para E2E (por defecto http://localhost:3001). |
| OutputPath | string | Fichero donde escribir el resultado JSON. |
| OutputJson | switch | Emitir resultado JSON por stdout. |

## Salida

Cumple `SddIA/tools/tools-contract.json`: toolId, exitCode, success, timestamp, message, feedback[], data (tests_summary, duration_ms).

## Fases (feedback)

init → install (opcional) → lint → build → unit → e2e → done (o error).

## Estado de Implementación

**Formato actual:** Script PowerShell (`.ps1`)
**Ubicación:** `scripts/tools/run-tests-frontend/Run-Tests-Frontend.ps1`
