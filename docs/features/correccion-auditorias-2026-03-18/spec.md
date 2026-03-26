---
contract_ref: paths.featurePath/correccion-auditorias-2026-03-18/spec.json
input_ref: docs/audits/AUDITORIA_2026_03_18.md
name: Corrección de Errores Jest-DOM
process_id: correccion-auditorias
spec_version: 1.0.0
---

# Especificación Técnica: Corrección de Errores Jest-DOM

## 1. Visión General

Esta especificación detalla los cambios requeridos para corregir los errores de compilación TypeScript durante la validación estática del proyecto (ejecución de `npx tsc --noEmit`).

La auditoría del día 2026-03-18 expuso que TypeScript no estaba pudiendo resolver las interfaces de aserción modificadas de `jest-dom` para las pruebas unitarias usando `JestMatchers<HTMLElement>`.

## 2. Requerimientos Funcionales y No Funcionales

1. **Configuración TypeScript:** Modificar el archivo `src/tsconfig.json` insertando `"jest.setup.js"` en el array principal `include`, para asegurar que TypeScript detecte la importación que inyecta en el objeto global la sobrecarga de tipos en las aserciones de `expect()`. Esto soluciona los problemas de aserciones del DOM con Jest para la v6+ de RTL.

## 3. Arquitectura e Implementación Técnica

- **`src/tsconfig.json`**:
  - Acción: Se agregará `"jest.setup.js"` al array base de la directiva `include`.

## 4. Consideraciones de Seguridad y Riesgos

- **Ningún riesgo funcional** es introducido en la base de código. Se trata exclusivamente de configuraciones de TypeScript para parsear el entorno de desarrollo y testing.
- **Compatibilidad**: Al no usar la variable de compilador `"types"`, prevenimos sobreescribir las referencias de `@types/` globales de Node o React, lo cual causaría errores en tests, construcciones asincronas o configuraciones de Jest.

## 5. Criterios de Aceptación

- `npm run test` es exitoso.
- `npx tsc --noEmit` es exitoso sin alertas TS2339 para las firmas de métodos como `toBeInTheDocument`.