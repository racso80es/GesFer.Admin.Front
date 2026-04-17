---
version: 1.0.0
title: Especificación de Corrección Auditoría 2026-04-13
status: in-progress
---

# Especificación

Este documento detalla la solución técnica para resolver los hallazgos de la auditoría 2026-04-13.

## Solución Técnica

1. **Importaciones:** Usaremos un `str_replace_editor` (reemplazo en archivos) para cambiar rutas como `../../../components/...` por `@/components/...`.
2. **Manejo de Errores:** Añadiremos la línea `const message = error instanceof Error ? error.message : String(error);` dentro de los bloques catch afectados y cambiaremos la llamada `console.error(error)` por `console.error(message)` (o mediante una interpolación si se necesita un prefijo).

## Alcance

- `src/app/companies/new/page.tsx`
- `src/app/companies/[id]/edit/page.tsx`
- `src/components/shared/DestructiveActionConfirm.tsx`
- `src/app/companies/page.tsx`

## Validaciones

1. Revisar los archivos manualmente tras los cambios.
2. Ejecutar `npx tsc --noEmit` y `npm run build`.
