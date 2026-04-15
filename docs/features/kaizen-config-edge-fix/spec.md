---
process_id: "correccion-auditorias"
name: "Refactorización de config.ts para Edge Runtime"
description: "Elimina dependencias dinámicas a fs y path."
phases:
  - id: "1"
    name: "Refactorizar src/lib/config.ts"
persist_ref: "docs/features/kaizen-config-edge-fix"
---

# Especificación

## Alcance
Refactorizar la función `loadConfig()` en `src/lib/config.ts` para que dependa exclusivamente de variables de entorno y no del sistema de archivos local.
