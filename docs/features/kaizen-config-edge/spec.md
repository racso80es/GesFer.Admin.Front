---
process_id: feature
name: Corrección Edge config
contract_ref: paths.processPath/feature/spec.md
description: Documentación de la corrección del hallazgo crítico en src/lib/config.ts reportado en AUDITORIA_2026_03_21.md
persist_ref: paths.featurePath/kaizen-config-edge
---
# Especificación: Kaizen Config Edge

## Propósito
Esta acción documenta la refactorización arquitectónica requerida para cumplir con las normas de Next.js Edge Runtime, evitando usar módulos de Node.js core (`fs`, `path`) estática o dinámicamente en código isomórfico.

## Requisitos
- **Arquitectura Isomórfica:** `loadConfig` no debe usar `eval`, `__non_webpack_require__` u otro medio para cargar los módulos core de Node.js en tiempo de ejecución.
- **DoD:** `npm run build` funciona sin errores ni warnings críticos relativos a uso indebido de módulos de Node en código de Edge o Cliente, y `cd src && npm run test` debe seguir pasando sin colisiones.

## Cambios Previstos
Se modificará el método `loadConfig` en `src/lib/config.ts`:
1. Borrar `getModule` que usa `__non_webpack_require__`.
2. Borrar uso de `path.join`.
3. Borrar uso de `fs.existsSync` y `fs.readFileSync`.
4. Devolver simplemente el valor de `getDefaultConfig(env)`.