---
type: "implementation"
feature: "automatic-task"
---

# Detalles de la Implementación

- Se modificó `src/app/api/companies/route.ts` añadiendo la lógica `const message = error instanceof Error ? error.message : String(error);` en su respectivo bloque `catch` del método `POST`.
- Se modificaron los bloques `catch` de `src/app/api/companies/[id]/route.ts` para usar este mismo guard estricto.
- Se removió el tercer parámetro (objeto de error) en `console.error` dentro de `src/app/companies/page.tsx`.
