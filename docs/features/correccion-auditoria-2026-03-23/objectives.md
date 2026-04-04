# Objectives: Correcciones de Auditoría 2026-03-23

## Objetivo Principal
Aplicar las correcciones requeridas por la Auditoría `AUDITORIA_2026_03_23.md`, focalizándose en los hallazgos críticos relacionados con el manejo de errores en los bloques `catch` de los route handlers y verificando el refactor del frontend.

## Objetivos Específicos
1. Refactorizar los endpoints en `src/app/api/companies/[id]/route.ts` (GET, PUT, DELETE) para usar type guards (`instanceof Error`) en lugar de pasar directamente el objeto de error arrojado a `console.error`.
2. Refactorizar el endpoint en `src/app/api/companies/route.ts` (POST) aplicando la misma técnica de seguridad para los errores.
3. Verificar que los problemas menores y medios (data fetching de companies usando proxy interno y extracción de variables en `company-form.tsx`) ya estén mitigados o alineados a las normativas vigentes.
4. Cumplir estrictamente con la directiva arquitectónica que prohíbe el uso o registro del tipo `unknown` directamente.
