---
name: Corrección de Auditoría 2026-03-23
description: Resolución de hallazgos críticos (type guards) sobre el manejo de excepciones en route handlers.
related_actions:
  - spec
  - clarify
  - planning
  - implementation
  - execution
  - validate
  - finalize
---
# Especificación: Corrección de Auditoría 2026-03-23

## Alcance
La intervención se centrará exclusivamente en la refactorización de los archivos que implementan route handlers (`GET`, `POST`, `PUT`, `DELETE`) para los endpoints `/api/companies/[id]` y `/api/companies/`, asegurando que el registro de los errores cumpla el estándar de type guards (`instanceof Error`) requerido para TypeScript bajo la directiva `SddIA`.

## Requisitos Técnicos
1. Evitar la exportación del objeto de error puro en `console.error`.
2. Extracción segura: `const message = error instanceof Error ? error.message : String(error);`.
3. Validar de nuevo la estabilidad y que no se rompe ningún test de integración.

## Referencias
- `docs/audits/AUDITORIA_2026_03_23.md`
- `SddIA/process/correccion-auditorias/spec.md`
