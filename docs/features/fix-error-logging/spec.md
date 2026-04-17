---
type: "feature"
feature: "fix-error-logging"
---
# Especificaciones de Implementación
- Se deben modificar `src/app/api/companies/[id]/route.ts` (GET, PUT, DELETE) y `src/app/api/companies/route.ts` (POST)
- Reemplazar el logueo del error por:
```typescript
const message = error instanceof Error ? error.message : String(error);
console.error("Mensaje específico del endpoint:", message);
```
- No se debe pasar nunca el objeto `error` original al método `console.error`.
