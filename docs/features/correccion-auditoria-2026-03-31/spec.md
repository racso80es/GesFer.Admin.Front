---
id: correccion-auditoria-2026-03-31
name: Corrección de manejo de errores
description: Implementación de extracción segura de mensajes de error en bloques catch.
---

# Spec

## Modificaciones de Código

Se aplicará un refactor en los bloques de `catch (error)` en los siguientes archivos:

1. `src/app/companies/new/page.tsx`
2. `src/app/companies/[id]/edit/page.tsx`
3. `src/app/api/companies/[id]/route.ts`
4. `src/app/api/companies/route.ts`

### Patrón a Aplicar:

```typescript
catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Context message:", message);
  // TODO: Add toast notification if client-side
}
```

## Referencias
- `docs/audits/AUDITORIA_2026_03_31.md`