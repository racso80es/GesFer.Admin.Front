---
title: Kaizen - Error Handling Estricto
description: Refactorización en base a auditoría 2026-03-23
type: kaizen
---

# Especificación Técnica

## Requerimientos

La regla arquitectónica dicta que todo error capturado (de tipo `unknown`) debe ser procesado de manera segura antes de registrarlo.

El patrón correcto es el siguiente:
```typescript
catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Mensaje contextual:", message);
  // SIN exponer `error` u objetos crudos.
}
```

## Archivos Afectados

1. `src/app/api/companies/[id]/route.ts`:
   - En GET, PUT y DELETE: Múltiples instancias de `console.error(..., error)` sin usar type guards.

2. `src/app/api/companies/route.ts`:
   - En POST: Instancia de `console.error(..., error)` sin usar type guard.
   - En GET: Aunque usa `error instanceof Error`, el código final no debe pasar el objeto original a la función `console.error()`.

## Criterios de Aceptación
- No debe haber llamadas a `console.error` que reciban el parámetro `error` (o cualquier variable de tipo `unknown`) directamente como segundo argumento en los archivos señalados.
- Las respuestas HTTP en estos endpoints deben devolver mensajes seguros generados tras la extracción del error.
- Los tests y la compilación (`npx tsc`) y el build (`npm run build`) deben pasar sin errores.