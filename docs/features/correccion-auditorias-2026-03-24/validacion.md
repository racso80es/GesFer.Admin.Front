---
title: Validación - Corrección 2026-03-24
type: validacion
status: open
---
# Definition of Done
- `npx tsc --noEmit` sin errores.
- Archivo contiene `const message = error instanceof Error ? error.message : String(error);` en `catch`.