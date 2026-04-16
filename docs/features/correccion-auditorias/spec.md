---
title: Spec - Corrección Auditorías
date: "2026-04-15"
---

# Especificaciones de Implementación

La auditoría determinó la existencia de deuda técnica referente a la validación estricta de variables en la firma del manejador de errores de las páginas relacionadas a organizaciones ("companies").

## Puntos de Intervención:

1. **`src/app/companies/new/page.tsx`**:
    *   **Función**: `onSubmit` (línea ~30).
    *   **Cambio**: Extraer el mensaje usando `error instanceof Error ? error.message : String(error)` y enviar el texto plano a `console.error` y `setError`.
2. **`src/app/companies/[id]/edit/page.tsx`** (2 instancias):
    *   **Función 1**: `fetchCompany` (línea ~28).
    *   **Cambio 1**: Extraer el mensaje y pasar el texto plano a `console.error`.
    *   **Función 2**: `onSubmit` (línea ~55).
    *   **Cambio 2**: Extraer el mensaje y pasar el texto plano a `console.error` y `setSubmitError`.

## Criterios de Aceptación:
*   Se elimina cualquier uso directo del objeto `error` como argumento dentro de la cadena `catch`.
*   El compilador TypeScript (vía `tsc --noEmit`) y la compilación Edge no deben fallar.