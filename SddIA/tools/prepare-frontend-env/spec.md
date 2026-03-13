# Especificación: prepare-frontend-env

**toolId:** `prepare-frontend-env`
**Definición (SddIA):** Este directorio.
**Implementación (scripts):** Ruta canónica en Cúmulo → **implementation_path_ref:** `paths.toolCapsules.prepare-frontend-env`.

## Objetivo

Herramienta que prepara el entorno de desarrollo frontend: instala dependencias npm en `src/` y verifica que exista configuración de entorno (`.env.local`).

## Entradas

| Parámetro | Tipo | Descripción |
|----------|------|-------------|
| OutputPath | string | Fichero donde escribir el resultado JSON (contrato). |
| OutputJson | switch | Emitir el resultado JSON por stdout. |

## Salida

Cumple `SddIA/tools/tools-contract.json`: objeto JSON con toolId, exitCode, success, timestamp, message, feedback[], data, duration_ms.

## Fases (feedback)

init → install → env-check → done (o error).
