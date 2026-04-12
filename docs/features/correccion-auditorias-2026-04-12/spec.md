---
title: Especificación de Corrección Auditoría 2026-04-12
---
# Especificación

- Modificar `src/app/companies/new/page.tsx` y `src/app/companies/[id]/edit/page.tsx` usando alias de path.
- En múltiples componentes y APIs de `src/`, se inyectará el type guard `const message = error instanceof Error ? error.message : String(error);` y se pasará a `console.error`.
