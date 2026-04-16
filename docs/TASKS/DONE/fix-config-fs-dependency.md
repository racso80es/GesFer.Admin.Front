# Tarea Kaizen: Eliminar dependencia de fs en config.ts

**Origen:** AUDITORIA_2026_03_21.md (Hallazgo Crítico)
**Descripción:** El archivo `src/lib/config.ts` utiliza `fs.readFileSync` e importación dinámica de módulos Node (`fs`, `path`) en tiempo de ejecución para leer configuraciones JSON locales. Esto viola la arquitectura recomendada para aplicaciones Edge y genera inestabilidad o fallos en ejecución en entornos sin acceso a sistema de archivos o Edge Runtime.
**Acción Requerida:** Refactorizar `loadConfig()` para eliminar por completo el uso de `fs` y `path`. La función debe basarse unicamente en `getDefaultConfig(env)`.
**Definition of Done (DoD):**
  - El archivo `src/lib/config.ts` no contiene referencias a `fs` ni a `path`.
  - La función `loadConfig()` debe basarse unicamente en `getDefaultConfig(env)`.
  - El proceso de construcción de Next.js (`npm run build`) no arroja fallos.
