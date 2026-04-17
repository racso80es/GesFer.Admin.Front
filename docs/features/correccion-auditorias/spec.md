---
title: Spec - Corrección Auditorías
feature_id: correccion-auditorias
date: "2026-04-15"
version: "1.0"
---

# Especificación de la corrección

## Contexto

Las auditorías detectaron uso de `console.error` (y estado) pasando el objeto `error` sin type guard en endpoints Next.js y en páginas de companies, en contra del tipado estricto.

## Rutas API

### `src/app/api/companies/route.ts`

- **Ubicación:** bloque `catch` en `POST`.
- **Cambio:** extraer mensaje con type guard y pasar solo texto a `console.error` y a la respuesta JSON.

### `src/app/api/companies/[id]/route.ts`

- **Ubicación:** bloques `catch` en `GET`, `PUT` y `DELETE`.
- **Cambio:** mismo patrón.

## Páginas de organizaciones

1. **`src/app/companies/new/page.tsx`** — `handleSubmit` / `onSubmit`: extraer mensaje y pasar texto a `console.error` y `setError`.
2. **`src/app/companies/[id]/edit/page.tsx`** — `fetchCompany` y `handleSubmit`: extraer mensaje; texto plano a `console.error` y `setSubmitError`.

## Patrón de código

```typescript
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Error al ejecutar acción:", message);
  return NextResponse.json(
    { error: "Error de negocio", detail: message },
    { status: 500 }
  );
}
```

(En páginas, sustituir el `return NextResponse` por `setError` / `setSubmitError` según corresponda.)

## Criterios de aceptación

- No se pasa el objeto `error` directamente a `console.error` ni a setters de estado.
- `tsc --noEmit` y el build no fallan por estos cambios.
