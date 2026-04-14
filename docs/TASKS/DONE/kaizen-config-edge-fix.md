# Kaizen Config Edge Fix

**ID:** kaizen-config-edge-fix
**Tipo:** Automatic Task / Bug Fix
**Origen:** Auditoría AUDITORIA_2026_03_21.md

## Descripción
Refactorizar `src/lib/config.ts` para eliminar las llamadas dinámicas a los módulos `fs` y `path`. El uso de sistema de archivos en entornos Edge o isomorfos viola la arquitectura recomendada, generando inestabilidad. Se apoyará estrictamente en `getDefaultConfig(env)`.

## Estado
Activo