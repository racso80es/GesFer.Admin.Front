---
contract_ref: paths.processPath/process-contract.json
input_ref: docs/audits/AUDITORIA_2026_03_28.md
name: Corrección según Auditorías - 2026-03-28
persist_ref: docs/features/correccion-auditorias-2026-03-28
phases:
  - description: Añadir ignore pattern en Jest config
    id: '0'
    name: Configuración
principles_ref: paths.principlesPath
process_id: correccion-auditorias
related_actions:
  - configure-jest
related_skills:
  - javascript
spec_version: 1.0.0
---
# Especificación: Corrección Haste Map Collision en Jest

## Resumen
La auditoría del 2026-03-28 reportó que el `haste-map` de Jest sufre de colisión de nombres (`package.json`) debido a los artefactos generados por el build de Next.js (`.next/standalone/package.json`).

## Solución Propuesta
Modificaremos la constante `customJestConfig` en `src/jest.config.js` y agregaremos:
```javascript
  modulePathIgnorePatterns: [
    '<rootDir>/.next/'
  ],
```

Esto prevendrá que el worker de Jest explore el directorio `standalone` e intente parsear sub-módulos o duplicados.
