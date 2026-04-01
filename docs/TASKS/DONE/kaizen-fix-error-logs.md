# Kaizen: Fix Error Handling in Route Handlers

**Tipo:** Kaizen / Bug Fix
**Prioridad:** Alta

## Descripción
Modificar el manejo de errores en los endpoints `src/app/api/companies/route.ts` y `src/app/api/companies/[id]/route.ts` para extraer explícitamente el mensaje del error utilizando un Type Guard, en lugar de pasar directamente el objeto `error` a `console.error()`.

Esto cumple con la directiva estricta de TypeScript:
```typescript
const message = error instanceof Error ? error.message : String(error);
console.error("Mensaje de error:", message);
```