---
title: Especificación de Corrección de Auditoría 2026-04-08
type: spec
status: in_progress
---

# Especificación

Este documento detalla la implementación técnica para la corrección de los hallazgos reportados en `docs/audits/AUDITORIA_2026_04_08.md`.

## 1. Manejo Seguro de Errores

### Problema
El compilador de TypeScript tipa `error` en un bloque `catch (error)` como `unknown`. Usar o loguear este objeto directamente (ej. `console.error(error)`) puede causar excepciones en tiempo de ejecución o exponer detalles indeseados si el error no es una instancia de `Error`.

### Solución Técnica
En todos los bloques `catch` identificados, se extraerá el mensaje de error de forma segura mediante un Type Guard antes de pasarlo a la función de log.

```typescript
catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Contexto:", message);
}
```

Archivos afectados:
- `src/app/api/companies/[id]/route.ts`
- `src/app/api/companies/route.ts`
- `src/app/companies/page.tsx`
- `src/app/companies/new/page.tsx`
- `src/app/companies/[id]/edit/page.tsx`
- `src/components/shared/DestructiveActionConfirm.tsx`

## 2. Integridad de Rutas de Importación

### Problema
El uso de paths relativos con mucha profundidad (`../../../`) cruzando límites entre módulos (por ejemplo, desde `app/` hacia `components/`) viola las convenciones de arquitectura Frontend.

### Solución Técnica
Reemplazar dichas importaciones por alias absolutos (`@/`).

Archivos afectados:
- `src/app/companies/new/page.tsx`
- `src/app/companies/[id]/edit/page.tsx`