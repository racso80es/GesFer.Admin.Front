---
type: "validacion"
feature: "automatic-task"
---

# Validación

- Se ejecutará `npx tsc --noEmit` comprobando que no hay errores de tipado nuevos o pendientes.
- Se verificará con `npm run build` el éxito del empaquetado de producción Next.js (Edge environment simulado).
- Se ejecutará `npm run test` confirmando que las pruebas corren exitosamente.
