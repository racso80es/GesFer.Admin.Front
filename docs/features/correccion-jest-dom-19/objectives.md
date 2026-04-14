# Objetivos: Corrección Auditoría 2026-03-19

## 1. Contexto
Se reporta un fallo crítico en la validación de tipos (`TS2339`) de TypeScript en los tests debido a la falta de declaraciones de `@testing-library/jest-dom`.

## 2. Objetivo
Asegurar que el compilador de TypeScript cargue los tipos de `@testing-library/jest-dom` de manera global.

## 3. Criterios de Aceptación (DoD)
- El archivo `src/tsconfig.json` incluye `"jest.setup.js"` en el arreglo `include`.
- `cd src && npx tsc --noEmit` se ejecuta sin errores.
- Pruebas y compilación corren con éxito.