---
status: "active"
date: "2026-03-23"
type: "bug-fix"
---

# Especificación: Fix API Error Logging

## Descripción
La auditoría del 2026-03-23 identificó múltiples usos de `console.error` donde se pasa directamente el objeto de error interceptado en bloques `catch`. Esto viola las convenciones estrictas de tipado del proyecto, donde un error puede ser de tipo `unknown`.

## Cambios Requeridos
En `src/app/api/companies/[id]/route.ts`, para los métodos `GET`, `PUT` y `DELETE`:
Reemplazar:
```typescript
catch (error) {
  console.error(..., error);
}
```

Por:
```typescript
catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(..., message);
}
```
