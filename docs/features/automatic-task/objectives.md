---
type: "objectives"
feature: "automatic-task"
---

# Objetivos

Ejecutar las acciones Kaizen indicadas en la auditoría del 2026-03-23:
1. Modificar los route handlers en `src/app/api/` para implementar type guards estrictos de TypeScript en `catch (error)`, extrayendo el mensaje sin pasar el objeto de error directamente a `console.error`.
2. Refactorizar el data fetching en `src/app/companies/page.tsx` para usar `getAdminApiWithToken` en lugar de un `fetch` local que requiere pasar cookies.
3. Refactorizar `src/components/companies/company-form.tsx` extrayendo los arrays `languageOptions` y `languageNames` fuera del componente.
