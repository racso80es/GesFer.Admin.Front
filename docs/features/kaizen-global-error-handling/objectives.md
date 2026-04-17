# Objetivos: Type Guards en Catch Blocks Globales

## 1. Propósito
Aplicar un manejo de errores robusto en bloques `catch` globales que no fueron refactorizados en iteraciones anteriores, cumpliendo con la directiva arquitectónica que prohíbe el uso o registro directo del tipo `unknown`.

## 2. Alcance
Archivos a modificar:
- `src/components/shared/DestructiveActionConfirm.tsx`
- `src/app/dashboard/page.tsx`
- `src/app/login/page.tsx`

## 3. Criterios de Éxito (Definition of Done)
- Todos los bloques `catch` referenciados utilizan un type guard (`error instanceof Error`) para extraer un mensaje seguro.
- No hay llamadas a `console.error` que reciban directamente la variable de error inferida (usualmente `unknown`).
- El proyecto compila correctamente.
- Los tests existentes pasan exitosamente.
