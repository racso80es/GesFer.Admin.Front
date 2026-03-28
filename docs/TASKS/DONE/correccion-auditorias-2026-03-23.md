# Kaizen Action: Strict Error Handling in API Routes

**Origen:** Auditoría 2026-03-23
**Tipo:** Tarea Automática (Kaizen)

## Descripción
Se ha detectado mediante la auditoría del 2026-03-23 que existen manejos de error inseguros en los bloques `catch` de algunas rutas de API. Esto viola la directiva arquitectónica que exige extraer el string de error mediante un type guard (`error instanceof Error`) antes de enviarlo al log (`console.error`), previniendo fallos en tiempo de ejecución al manipular objetos `unknown`.

## Archivos a Modificar
- `src/app/api/companies/[id]/route.ts`
- `src/app/api/companies/route.ts`

## Objetivos
Refactorizar los `catch` blocks pendientes inyectando type guards.
