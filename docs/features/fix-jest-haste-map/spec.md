---
task_id: fix-jest-haste-map
description: Spec for jest config fix
---
# Especificación Técnica
- Modificar o verificar `src/jest.config.js`.
- Añadir `'<rootDir>/.next/'` a la lista de `modulePathIgnorePatterns` si no está presente o verificar su correcta sintaxis.
