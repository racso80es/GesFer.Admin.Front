---
name: "Corrección Auditorías: Type Guards"
description: "Resolución de hallazgos de auditoría (2026-03-23) sobre manejo estricto de errores en handlers de Next.js"
version: "1.0"
date: "2026-04-09"
author: "Agente Kaizen"
---

# Especificación de la Corrección

## Contexto
Las auditorías recientes (ej. `AUDITORIA_2026_03_23.md`) detectaron el uso de `console.error` pasando directamente el objeto original `error` sin extraer un type guard en los endpoints de Next.js, lo que viola las directivas de código estricto.

## Acciones de Refactorización

### 1. `src/app/api/companies/route.ts`
- **Ubicación:** Bloque `catch` en el método `POST`.
- **Cambio:** Extraer string del error y enviar a `console.error`.

### 2. `src/app/api/companies/[id]/route.ts`
- **Ubicación:** Bloques `catch` en los métodos `GET`, `PUT` y `DELETE`.
- **Cambio:** Extraer string del error y enviar a `console.error`.

## Patrón de Código a Implementar
```typescript
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Error al ejecutar accion:", message);
  return NextResponse.json(
    { error: "Error de negocio", detail: message },
    { status: 500 }
  );
}
```
