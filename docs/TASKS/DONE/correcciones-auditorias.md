# Tarea de Corrección de Auditoría

**Origen:** `docs/audits/AUDITORIA_2026_03_23.md`

## Acciones Requeridas:

1. **Type Guards en Logs de Error:**
   - Modificar `src/app/api/companies/[id]/route.ts` para extraer el mensaje con type guard en cada bloque `catch` y eliminar la exposición del objeto original en `console.error`.
   - Modificar `src/app/api/companies/route.ts` para arreglar los logs de error, implementando type guards.
   - Modificar `src/app/companies/page.tsx` para cambiar `console.error("Error fetching companies:", message, error);` a `console.error("Error fetching companies:", message);`.

2. **Refactorización de Constantes:**
   - Verificar y/o refactorizar `src/components/companies/company-form.tsx` para asegurar que las constantes de idiomas (`languageOptions` y `languageNames`) estén fuera de la función de render.
