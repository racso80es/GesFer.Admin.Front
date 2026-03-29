# Tarea Kaizen: Type Guards y Manejo de Errores (Auditoría 2026-03-23)

**Origen:** `docs/audits/AUDITORIA_2026_03_23.md`
**Tipo:** Tarea automática (Kaizen)

## Descripción
La auditoría identificó el uso de `console.error` pasando directamente el objeto `error` (o sin Type Guards apropiados de TypeScript) en los manejadores de rutas API en `src/app/api/companies/route.ts` y `src/app/api/companies/[id]/route.ts`. Esto viola la directiva de código estricto que requiere un manejo de errores robusto.

## Acciones Requeridas
- Refactorizar los bloques `catch` en los endpoints `GET`, `PUT`, `DELETE` de `src/app/api/companies/[id]/route.ts` para extraer explícitamente el mensaje de error usando un Type Guard:
  ```typescript
  const message = error instanceof Error ? error.message : String(error);
  console.error("Mensaje de error:", message); // SIN pasar `error` directamente
  ```
- Aplicar la misma refactorización en el endpoint `POST` de `src/app/api/companies/route.ts`.

## Definition of Done (DoD)
- Ningún archivo modificado usa `console.error(..., error)` exponiendo el objeto original.
- El proyecto compila correctamente (`npm run build`, `npx tsc --noEmit`).
- Los tests se ejecutan exitosamente.
