---
id: correccion-auditoria-2026-03-23
title: Implementación Corrección Auditoría 2026-03-23
type: implementation
status: completed
---

# Implementación

1. **src/app/api/companies/route.ts**:
   - Modificado el handler `POST`. Se añadió un type guard `const message = error instanceof Error ? error.message : String(error);` y se actualizó `console.error` para solo imprimir `message`.
2. **src/app/api/companies/[id]/route.ts**:
   - Modificados los handlers `GET`, `PUT`, `DELETE`. En todos ellos se añadió el type guard para `message` y se actualizó `console.error`.
3. **src/app/companies/page.tsx**:
   - Se removió la variable `error` del último argumento de `console.error()`, de manera que solo se imprime el `message` que ya estaba siendo extraído.
