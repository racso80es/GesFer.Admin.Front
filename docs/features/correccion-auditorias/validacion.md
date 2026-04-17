---
title: Validación - Corrección Auditorías
feature_id: correccion-auditorias
date: "2026-04-15"
---

# Validación y cierre

## Cambios comprobados

1. Rutas `src/app/api/companies/route.ts` y `src/app/api/companies/[id]/route.ts`: type guards en los `catch` y mensajes seguros en log y respuesta.
2. `src/app/companies/new/page.tsx`: type guard en el `catch` de envío del formulario.
3. `src/app/companies/[id]/edit/page.tsx`: type guards en `fetchCompany` y en el `catch` de actualización.
4. `console.error`, `setError` y `setSubmitError` reciben solo cadenas derivadas del error, no el valor `unknown` del `catch`.

## Pruebas

- `npx tsc --noEmit` sin errores.
- `npm run build` correcto.
- `npm run test` con suites en verde.

## DoD

- Todos los `catch` tocados cumplen el patrón acordado.
- Sin bypass de deuda técnica en el tipado.
