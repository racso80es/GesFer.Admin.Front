---
process_id: "refactor-audit-2026-03-23"
name: "Corrección Auditoría 2026-03-23"
description: "Refactorización para aplicar type guards en bloques catch de los route handlers"
phases: ["planificación", "implementación", "verificación"]
---

# Especificación

## Detalles del Desarrollo
Se corregirán los siguientes archivos modificando el catch:
1. `src/app/api/companies/[id]/route.ts`: Modificación en métodos GET, PUT, y DELETE.
2. `src/app/api/companies/route.ts`: Modificación en método POST.

## Reglas de Implementación
- El bloque catch usará la estructura:
  ```typescript
  catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Mensaje especifico:", message);
  }
  ```
- Ningún archivo puede contener el log de `unknown` u objetos directos en `console.error`.
