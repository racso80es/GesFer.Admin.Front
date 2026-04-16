---
title: Kaizen Route Handlers
status: active
type: refactorization
---

# Kaizen Route Handlers Specification

Refactorización en `src/app/api/companies/[id]/route.ts` y `src/app/api/companies/route.ts` para que todos los `catch(error)` implementen un type guard (ej: `const message = error instanceof Error ? error.message : String(error)`) e impriman el texto en lugar del objeto `error`.
