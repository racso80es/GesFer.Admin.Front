---
name: Kaizen Type Guards en Catch Blocks Globales
process_id: correccion-auditorias
spec_version: 1.0.0
---

# Especificación: Type Guards en Catch Blocks Globales

## 1. Definición del Problema
Se ha detectado el uso de variables de error inferidas (`unknown`) pasadas directamente a funciones de logging como `console.error` en varios archivos del frontend. Esto viola la convención arquitectónica que exige extraer el mensaje de error de forma segura.

## 2. Solución Propuesta
Refactorizar los bloques `catch` en los archivos identificados para aplicar la siguiente lógica:
```typescript
catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Contexto del error:", message);
  // Resto de la lógica (e.g., setSubmitError, etc.)
}
```

## 3. Archivos Afectados
- `src/components/shared/DestructiveActionConfirm.tsx`
- `src/app/dashboard/page.tsx`
- `src/app/login/page.tsx`
