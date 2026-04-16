# Feature Specification: Corrección Auditorías 2026-03

**Status:** In Progress
**Context:** Kaizen Actions required by audits `AUDITORIA_2026_03_23.md`.

## Objetivos
- Resolver el uso inadecuado de `console.error` en varios Route Handlers de la API (`companies/[id]/route.ts`, `companies/route.ts`).
- Asegurar que el mensaje de error se extrae con type guards (`error instanceof Error`) y nunca se pasa el objeto `error` original al log para prevenir vulnerabilidades.
- Quitar el objeto `error` de la salida `console.error` en `companies/page.tsx` durante el Data Fetching.

## Alcance
Modificaciones en `src/app/api/companies/[id]/route.ts`, `src/app/api/companies/route.ts`, y `src/app/companies/page.tsx`.