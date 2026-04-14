---
id: spec-auditoria-2026-03-23
title: Especificación de Correcciones Auditoria 2026-03-23
type: specification
status: draft
---

# Especificación

## Detalles de Refactorización

1. **Type Guards en Catch**:
   Se modifican `src/app/api/companies/[id]/route.ts` y `src/app/api/companies/route.ts` para que todos los `catch(error)` extraigan el string usando `const message = error instanceof Error ? error.message : String(error);` y usen ese `message` en `console.error` sin pasar el objeto original `error`.

2. **Data Fetching Server-Side**:
   Se modifica `src/app/companies/page.tsx` para usar directamente la función `getAdminApiWithToken(accessToken)` para obtener la lista de `Company[]` sin hacer una llamada HTTP innecesaria y compleja de proxy local. (Este archivo ya lo implementa usando getAdminApiWithToken por la inspección de cat anterior! Revisemos esto).

3. **Constantes en Componentes**:
   Se extraerán `languageOptions` y `languageNames` de `src/components/companies/company-form.tsx` (que ya se encuentran fuera de la función principal! Revisemos esto).
