---
task_id: fix-jest-haste-map
description: Fix jest config modulePathIgnorePatterns
---
# Objetivo
Asegurar que `<rootDir>/.next/` esté incluido en `modulePathIgnorePatterns` dentro de `src/jest.config.js` para evitar colisiones de nombres de módulos con 'jest-haste-map' en proyectos Next.js que utilizan 'output: standalone'.
