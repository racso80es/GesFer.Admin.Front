---
contract_ref: paths.processPath/process-contract.json
input_ref: docs/audits/AUDITORIA_2026_03_21.md
name: Especificación de Corrección de Auditoría 2026-03-21
persist_ref: docs/features/correccion-auditoria-2026_03_21
spec_version: 1.0.0
---
# Especificación: Corrección de Auditoría 2026-03-21

## Resumen del Plan de Implementación

Esta especificación describe el plan técnico para resolver las vulnerabilidades y violaciones arquitectónicas identificadas en `AUDITORIA_2026_03_21.md`.

### 1. Refactorización en `src/lib/config.ts`

- **Acción:** Remover bloque de carga dinámica de disco local `fs` y `path` mediante `require` / `fs.readFileSync` dentro de `loadConfig()`.
- **Justificación:** Previene problemas de compatibilidad y cuellos de botella síncronos, cumpliendo requerimientos Edge / React Server Components que dependen exclusivamente de la carga de `process.env`.
- **Implementación:** Limpiar `loadConfig()` para que resuelva retornando el resultado de `getDefaultConfig(getEnvironment())` como única fuente de verdad.

### 2. Refactorización en `src/lib/api/server-fetch.ts`

- **Acción:** Reemplazar `eval('import("https")')` por una evaluación estática condicional basada en runtime `typeof process !== "undefined" ? (process as any).mainModule.require("ht" + "tps") : null;`.
- **Justificación:** Cumple las normativas SddIA y de Next.js Edge Runtime evadiendo Webpack estático pero usando constructos seguros en lugar del hack restrictivo `eval`.
- **Implementación:** Modificar la línea pertinente en `serverPostJson` de `src/lib/api/server-fetch.ts`.

## Validación Técnica
Tras las modificaciones, se correrán las pruebas de validación automatizadas requeridas por el marco de trabajo del proyecto (linting y construcción).