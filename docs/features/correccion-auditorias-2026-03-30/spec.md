---
feature_name: correccion-auditorias-2026-03-30
status: in-progress
version: 1.0.0
---
# Especificación: Corrección de Auditorías (2026-03-30)

## Descripción
Este proceso detalla la solución al uso de la impresión cruda (raw logging) del objeto de excepciones originadas por un bloque `catch` que carece del tipado adecuado y type guard correspondiente, como dictado por la auditoría técnica de fecha 2026-03-30.

## Alcance
La aplicación modifica 8 archivos para la extracción de un `message` derivado de un bloque `catch (error)` que garantizan el correcto funcionamiento y logging estricto de string en:
- `src/app/dashboard/page.tsx`
- `src/app/api/companies/[id]/route.ts`
- `src/app/api/companies/route.ts`
- `src/app/login/page.tsx`
- `src/app/companies/page.tsx`
- `src/app/companies/new/page.tsx`
- `src/app/companies/[id]/edit/page.tsx`
- `src/components/shared/DestructiveActionConfirm.tsx`

## Estructura de Implementación
Para la extracción se empleará la forma estándar documentada para el proyecto:
```typescript
try {
  // Código...
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Context:", message);
}
```

## Pruebas
1. Construcción (Build): Validación mediante el comando `npm run build` en la carpeta `src`.
2. Verificación Unitaria: Comprobar regresiones de código mediante `npm run test` en la carpeta `src`.
