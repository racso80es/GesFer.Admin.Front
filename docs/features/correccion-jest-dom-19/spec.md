---
contract_ref: paths.processPath/process-contract.json
input_ref: docs/audits/AUDITORIA_2026_03_19.md
name: Especificación de Corrección de Auditoría 2026-03-19
persist_ref: docs/features/correccion-jest-dom-19
spec_version: 1.0.0
---
# Especificación: Corrección de Auditoría 2026-03-19

## Resumen del Plan de Implementación

Esta especificación describe la validación del archivo `src/tsconfig.json` para solventar los errores de tipos en jest-dom.

### 1. Refactorización en `src/tsconfig.json`
Se verificará o añadirá `"jest.setup.js"` al arreglo de `include` para garantizar la correcta importación de tipos en pruebas unitarias.