# Tarea Automática: Corrección de Auditoría 2026-03-23

- **Origen:** Auditoría 2026-03-23 (Kaizen)
- **Problema:** Múltiples errores críticos de log con objetos `error` expuestos y uso de data fetching local innecesario.
- **Acción:**
  1. Modificar handlers en `src/app/api/companies/route.ts` y `src/app/api/companies/[id]/route.ts` para extraer message con type guard en `catch`.
  2. Refactorizar la exposición del error en `src/app/companies/page.tsx` para no pasar el objeto original.
- **DoD:** Todos los `console.error` de la auditoría se corrigen para usar solo variables string y no el objeto error directamente.
