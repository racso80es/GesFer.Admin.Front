# Fix Route Handlers Error Logging

## Descripción
Corregir los problemas de manejo de errores identificados en la auditoría del 2026-03-23. Específicamente, asegurar que ningún bloque `catch` pase directamente el objeto `error` a `console.error`. Se debe extraer un mensaje seguro mediante un type guard estricto (`const message = error instanceof Error ? error.message : String(error);`).

## Tareas
- Refactorizar el manejo de errores en `src/app/api/companies/[id]/route.ts`.
- Refactorizar el manejo de errores en `src/app/api/companies/route.ts`.
- Eliminar el objeto de error de la salida por consola en `src/app/companies/page.tsx`.
