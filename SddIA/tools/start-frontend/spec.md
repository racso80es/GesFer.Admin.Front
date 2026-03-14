---
contract_ref: SddIA/tools/tools-contract.json
cumulo_ref: SddIA/agents/cumulo.json
depends_on_tools: []
env:
  - Windows 11
  - PowerShell 7+
  - Node.js 20+
implementation_path_ref: paths.toolCapsules.start-frontend
inputs:
  OutputJson: boolean (opcional). Emitir resultado JSON por stdout.
  OutputPath: string (opcional). Fichero donde escribir el resultado JSON.
  Port: number (opcional). Puerto del dev server. Por defecto 3001.
output:
  exit_codes:
    '0': 'Exito: frontend responde'
    '1': Config no encontrado o invalido
    '2': Puerto ocupado
    '7': Frontend no respondio a tiempo
  phases_feedback:
    - init
    - port-check
    - launch
    - healthcheck
    - done
    - error
  schema_ref: tools-contract.json output.required_fields y optional_fields
  success_criterion: El frontend responde en http://localhost:<port> (HTTP 200).
toolId: start-frontend
version: 1.0.0
---
# Especificación: start-frontend

**toolId:** `start-frontend`
**Definición (SddIA):** Este directorio.
**Implementación (scripts):** Ruta canónica en Cúmulo → **implementation_path_ref:** `paths.toolCapsules.start-frontend`.

## Objetivo

Herramienta que **levanta el dev server** del proyecto GesFer.Admin.Front (Next.js): ejecuta `npm run dev` en `src/`, comprueba que el puerto 3001 esté disponible y considera **éxito** si `http://localhost:3001` responde (HTTP 200).

## Entradas

| Parámetro     | Tipo   | Descripción |
|---------------|--------|-------------|
| Port          | number | Puerto del dev server (override). Por defecto 3001. |
| OutputPath    | string | Fichero donde escribir el resultado JSON (contrato). |
| OutputJson    | switch | Emitir el resultado JSON por stdout. |

## Validación de éxito

La herramienta considera la ejecución **correcta** si y solo si `http://localhost:<port>` responde (HTTP 200) dentro del timeout configurado.

## Códigos de salida (exitCode)

| exitCode | Situación |
|----------|-----------|
| 0 | Éxito: frontend responde |
| 1 | Config no encontrado o inválido |
| 2 | Puerto ocupado |
| 7 | Frontend no respondió a tiempo |

## Salida

Cumple `SddIA/tools/tools-contract.json`: objeto JSON con toolId, exitCode, success, timestamp, message, feedback[], data (url_base, port, pid), duration_ms.

## Fases (feedback)

init → port-check → launch → healthcheck → done | error.
