---
type: feature
status: active
---
# Especificaciones: Corrección de Auditoría 2026-03-23

## Archivos a modificar
- `src/app/api/companies/route.ts`
- `src/app/api/companies/[id]/route.ts`

## Cambios
Reemplazar todos los bloques catch que usen el objeto error original en `console.error` por su string seguro usando type guards.