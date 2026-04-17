---
name: Kaizen Corrección Edge Runtime fs.readFileSync
description: Corrección del hallazgo crítico de auditoría sobre el uso de fs.readFileSync en entorno isomórfico.
persist_ref: paths.featurePath/kaizen-config-edge
status: planning
---
# Objetivos de Mejora Continua (Kaizen)

## Contexto
Durante el análisis automático de la backlog (`docs/TASKS/`), al no existir tareas activas se inicia el ciclo de mejora continua Kaizen. Basado en el informe `docs/audits/AUDITORIA_2026_03_21.md`, el "Guardián de la Infraestructura" ha reportado un hallazgo crítico.

## Hallazgo
**Uso Inadecuado de Sistema de Archivos en Entorno Isomórfico (Crítico)**
El uso directo de `fs.readFileSync` e importación dinámica de módulos Node (`fs`, `path`) mediante `require` en tiempo de ejecución en `src/lib/config.ts` viola la arquitectura recomendada para aplicaciones Edge, generando inestabilidad o fallos en entornos sin acceso a sistema de archivos.

## Objetivo
Refactorizar la función `loadConfig()` en `src/lib/config.ts` para eliminar por completo el bloque condicional que emplea `fs` y `path`. La configuración del sistema debe recaer estricta y puramente en las variables de entorno inyectadas al proceso mediante el método `getDefaultConfig`.

## Criterios de Éxito (DoD)
- El archivo `src/lib/config.ts` no contiene referencias a `fs` ni a `path`.
- La función `loadConfig()` debe basarse unicamente en `getDefaultConfig(env)`.
- El proceso de construcción de Next.js (`npm run build`) no arroja fallos.
