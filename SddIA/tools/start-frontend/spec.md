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
