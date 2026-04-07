# Objetivos: Corrección de Auditoría 2026-03-23

- Corregir el paso directo del objeto de error en las llamadas a `console.error` dentro de los archivos `src/app/api/companies/route.ts` y `src/app/api/companies/[id]/route.ts`.
- Implementar validaciones de tipo usando `const message = error instanceof Error ? error.message : String(error);` para evitar posibles errores en runtime y fugas de información, cumpliendo el estándar del proyecto.