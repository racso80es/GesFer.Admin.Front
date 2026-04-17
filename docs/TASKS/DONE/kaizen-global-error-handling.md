# Kaizen: Type Guards en Catch Blocks Globales

**Tipo:** Fix / Kaizen

## Descripción
Se ha detectado el uso de variables de error de tipo `unknown` pasadas de manera directa a funciones de logging (`console.error`) en diferentes archivos que no fueron cubiertos en tareas anteriores.

## Requisito
Se debe aplicar la regla `error instanceof Error ? error.message : String(error)` en todos los bloques `catch` referenciados y limpiar los `console.error` residuales de variables `unknown` en:
- `src/components/shared/DestructiveActionConfirm.tsx`
- `src/app/dashboard/page.tsx`
- `src/app/login/page.tsx`
