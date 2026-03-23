---
name: Corrección TS2339 Jest DOM
contract_ref: paths.featurePath/correccion-auditorias-2026-03-22
---

# Especificación: Corrección TS2339 Jest DOM

## Análisis
Los test unitarios están fallando la verificación estricta de TypeScript por el tipo `JestMatchers` en aserciones de `@testing-library/jest-dom` como `toBeInTheDocument`. Dado que la versión es `6.9.1` (v6+), `@testing-library/jest-dom` expone sus propias declaraciones de tipo, pero actualmente no se están cargando porque el setup de Jest (`jest.setup.js`) no está indexado en el árbol de compilación de TypeScript para los tests.

## Implementación Propuesta
Añadir `"jest.setup.js"` al array de `"include"` en `src/tsconfig.json`.

Al incluir explícitamente el archivo `jest.setup.js`, TypeScript analizará el archivo en donde importamos `@testing-library/jest-dom` (y que consecuentemente inyecta los tipos al espacio global de Jest).