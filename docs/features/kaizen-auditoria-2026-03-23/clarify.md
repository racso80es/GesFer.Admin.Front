# Aclaraciones (Clarify)

## Consultas de la Auditoría 2026-03-23
La auditoría también menciona el archivo `src/app/api/admin/dashboard/summary/route.ts` y `src/app/companies/page.tsx`. Revisando los archivos en el código fuente base (`src/app/api/admin/dashboard/summary/route.ts` y `src/app/companies/page.tsx`), se evidencia que **YA** están refactorizados con sus respectivos Type Guards y proxy calls (`getAdminApiWithToken`).

También menciona el archivo `src/components/companies/company-form.tsx`. Viendo el código fuente, los diccionarios `languageOptions` y `languageNames` **YA** fueron extraídos al root del archivo en revisiones previas.

Por lo tanto, la intervención de esta tarea se concentrará exclusiva y directamente sobre los archivos que **aún mantienen las vulnerabilidades reportadas**: `src/app/api/companies/[id]/route.ts` y `src/app/api/companies/route.ts`.