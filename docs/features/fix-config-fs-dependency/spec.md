---
title: "Fix: Eliminar dependencia de fs en config.ts"
description: "Resolución del hallazgo crítico de la auditoría 2026-03-21 sobre uso de Node fs/path en Next.js Edge Runtime."
tags: ["bugfix", "kaizen", "edge-runtime", "nextjs"]
status: "in-progress"
---

# Especificaciones SddIA: Refactorización de config.ts

## Descripción General
Esta tarea resuelve un problema crítico que ocurre al utilizar `fs` y `path` de manera dinámica para intentar leer archivos locales `.json` dentro del archivo de configuración global `src/lib/config.ts`. Este patrón causa inestabilidad y conflictos en Next.js (entornos cliente y Edge) debido al análisis estático o ejecución incorrecta de componentes del sistema de archivos en entornos no compatibles con Node.

## Cambios Requeridos
1. **Modificar `loadConfig()` en `src/lib/config.ts`**:
   - Eliminar el bloque `if` que evalúa `typeof window === 'undefined' && typeof process !== 'undefined' && process.env.NEXT_RUNTIME !== 'edge'`.
   - Eliminar la inyección de la función interna `getModule`.
   - Eliminar la lectura de `fs.readFileSync` y las dependencias de `path.join()`.
   - Modificar la función `loadConfig` para que invoque y retorne únicamente `getDefaultConfig(env)`.
2. **Eliminación de la dependencia de JSON locales**:
   - El sistema se deberá apoyar puramente en el mapeo de variables de entorno de la función `getDefaultConfig`, alineado a una configuración 'Twelve-Factor'.

## Definition of Done (DoD)
- Ninguna referencia a `fs` ni a `path` existe dentro de `src/lib/config.ts`.
- La función `loadConfig()` debe basarse unicamente en `getDefaultConfig(env)`.
- El proceso de construcción de Next.js (`cd src && npm run build`) y el empaquetado standalone deben concluir con éxito.
- Los tests unitarios (`cd src && npm run test`) pasan correctamente.