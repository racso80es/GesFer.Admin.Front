---
feature: kaizen-error-handling
type: fix
status: execution
priority: high
created_at: '2026-03-27'
---

# Especificación: Type Guards en Bloques Catch

## Descripción
Basado en la Auditoría 2026-03-27, se detectó el uso inseguro de la variable arrojada en bloques `catch`, que es inferida como `unknown` por TypeScript y registrada directamente vía `console.error` o usada en setters sin comprobación de tipos.

## Restricción de Arquitectura
"Strict TypeScript error handling is required. Inside catch (error) blocks, never log or use the inferred unknown error object directly. Always use a type guard to extract the message, e.g., `const message = error instanceof Error ? error.message : String(error);`."

## Ubicaciones Detectadas
- `src/app/dashboard/page.tsx`
- `src/app/login/page.tsx`
- `src/app/companies/page.tsx`
- `src/app/companies/new/page.tsx`
- `src/app/companies/[id]/edit/page.tsx`
- `src/components/shared/DestructiveActionConfirm.tsx`
- `src/components/companies/company-form.tsx`
- `src/lib/api/admin-api-server.ts`
- `src/lib/config.ts`
- `src/components/ui/overlay-fix.tsx`

## Solución Requerida
Inyectar un type guard en cada una de estas ubicaciones y usar la variable extraída (`message`) de manera segura, ajustando el logging y el uso que se hacía del objeto de error original.