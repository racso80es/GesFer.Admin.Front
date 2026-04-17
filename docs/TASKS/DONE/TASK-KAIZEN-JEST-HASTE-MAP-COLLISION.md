# TASK-KAIZEN-JEST-HASTE-MAP-COLLISION

**Origen:** docs/audits/AUDITORIA_2026_03_28.md
**Fecha:** 2026-03-28

## Descripción
Resolver Haste module naming collision en Jest causado por la generación de build de Next.js (`.next/standalone/`).

## Acción requerida
Modificar el archivo `src/jest.config.js` y añadir el directorio `.next/` a la propiedad `modulePathIgnorePatterns` para que `jest-haste-map` ignore los archivos redundantes de standalone generados por Next.js.

## Definition of Done (DoD)
El comando `cd src && npm run test` debe ejecutarse limpiamente, sin mostrar el warning de "jest-haste-map: Haste module naming collision".
