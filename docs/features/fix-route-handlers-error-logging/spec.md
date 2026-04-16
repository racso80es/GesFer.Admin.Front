---
version: "1.0"
---

# Especificación: Fix Route Handlers Error Logging

## Requisitos Técnicos
En lugar de registrar directamente el objeto `error`, usar:
```typescript
const message = error instanceof Error ? error.message : String(error);
console.error("Mensaje de contexto:", message);
```

## Archivos a Modificar
- `src/app/api/companies/[id]/route.ts`: Modificar métodos GET, PUT, DELETE.
- `src/app/api/companies/route.ts`: Modificar método POST (el método GET ya ha sido parcheado).
- `src/app/companies/page.tsx`: Remover `error` del `console.error`.
