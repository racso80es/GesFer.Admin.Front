---
task_id: fix-jest-haste-map
description: Plan
---
# Plan de Implementación
1. Verificar contenido de `src/jest.config.js`.
2. Confirmar que la propiedad `modulePathIgnorePatterns` incluye `<rootDir>/.next/`.
3. Ejecutar los tests de Jest para validar que pasen sin problemas.