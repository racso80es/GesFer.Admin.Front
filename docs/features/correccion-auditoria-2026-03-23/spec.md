---
feature: correccion-auditoria-2026-03-23
type: fix
status: execution
priority: high
created_at: '2026-04-04'
---

# Especificación: Correcciones de Auditoría 2026-03-23

## Descripción
Este proceso se centra en resolver los "Pain Points" críticos identificados en la `AUDITORIA_2026_03_23.md`. Específicamente aborda el "Uso de console.error pasando el objeto de error sin extraer un string seguro usando type guard, violando la directiva de código estricto".

## Requerimientos y Restricciones
- **Directiva de Arquitectura:** Strict TypeScript error handling is required. Inside catch (error) blocks, never log or use the inferred unknown error object directly. Always use a type guard to extract the message.
- **Formato Sugerido:**
  ```typescript
  catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Mensaje de error:", message);
    // ...
  }
  ```
- **Definition of Done (DoD):**
  - Ningún archivo en `src/app/api/` debe usar `console.error` con el objeto `error` expuesto directamente al final; todos deben usar el string guard.

## Ubicaciones
1. `src/app/api/companies/[id]/route.ts`
   - Líneas 30, 49, 67 (métodos GET, PUT, DELETE).
2. `src/app/api/companies/route.ts`
   - Línea 39 (método POST).
