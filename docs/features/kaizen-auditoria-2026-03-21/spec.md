---
contract_ref: paths.processPath/correccion-auditorias/process-contract.json
input_ref: paths.auditsPath/AUDITORIA_2026_03_21.md
name: Kaizen Auditoría 2026-03-21
persist_ref: paths.featurePath/kaizen-auditoria-2026-03-21
phases:
  - description: Modificar loadConfig en src/lib/config.ts
    id: '0'
    name: Implementación
  - description: Verificar npm run build
    id: '1'
    name: Validación
principles_ref: paths.principlesPath
process_id: correccion-auditorias
related_actions:
  - spec
  - clarify
  - planning
  - implementation
  - execution
  - validate
  - finalize
related_skills:
  - iniciar-rama
  - finalizar-git
  - documentation
spec_version: 1.0.0
---

# Especificación: Kaizen Auditoría 2026-03-21

- **Descripción:** La función `loadConfig` en `src/lib/config.ts` actualmente usa `fs` y `path` a través de requerimiento dinámico para cargar configuraciones JSON desde el disco. Esto incumple los principios del entorno Edge e isomórfico en Next.js.
- **Cambio Requerido:** Se eliminará por completo el bloque condicional que carga con `fs`, confiando estrictamente en el entorno de variables a través de la función `getDefaultConfig(env)`.

## Restricciones
- Solo se deberá depender de `process.env`.
- No alterar otros archivos si no es necesario.
