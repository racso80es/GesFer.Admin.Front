---
id: correccion-auditoria-2026-03-23
title: Corrección de Auditoría 2026-03-23
type: specification
status: active
---

# Especificación

## Problema
Según la auditoría del 2026-03-23, existen llamadas críticas de log (`console.error`) en los route handlers de `companies` donde se expone o imprime directamente el objeto de error no controlado (o inferido por defecto como `unknown` y no filtrado), lo cual está prohibido por las normas arquitectónicas de SddIA. Además, en `companies/page.tsx` se le pasa a `console.error` un segundo argumento con el objeto `error` original sin tipo seguro.

## Solución
1. En `src/app/api/companies/route.ts` (POST) y `src/app/api/companies/[id]/route.ts` (GET, PUT, DELETE): añadir `const message = error instanceof Error ? error.message : String(error);` dentro de todos los bloques `catch` afectados y sustituir `console.error(..., error)` por `console.error(..., message)`.
2. En `src/app/companies/page.tsx`: quitar el argumento `error` original de la llamada `console.error(..., message, error)`.

## Definition of Done
Ningún archivo en `src/app/api/` usa `console.error` con el objeto `error` expuesto directamente, usando consistentemente el type guard estricto de string.
