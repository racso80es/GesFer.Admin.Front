# Clarificaciones: Corrección de Auditoría 2026-03-23

## Preguntas / Resoluciones Previas a Implementación

**P:** ¿Se debe modificar `src/app/api/admin/dashboard/summary/route.ts`?
**R:** No, revisando el código actual en la rama main, este archivo ya tiene implementada correctamente la extracción con `error instanceof Error ? error.message : String(error)` en su bloque catch. Sólo se aplicarán los cambios a los archivos aún pendientes en la carpeta `/api/companies`.

**P:** ¿Los hallazgos "Medios" de `src/app/companies/page.tsx` y `src/components/companies/company-form.tsx` requieren cambios en esta tarea?
**R:** No. Una revisión exhaustiva del codebase confirma que esos hallazgos ya están solventados (ej. `getAdminApiWithToken(accessToken)` ya se usa en `page.tsx` y las variables de idioma están extraídas a nivel root en `company-form.tsx`).
