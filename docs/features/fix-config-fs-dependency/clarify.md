# Clarificaciones: fix-config-fs-dependency

## Preguntas Previas al Desarrollo
- **¿Por qué existía `fs.existsSync` en `config.ts`?**
  - Probablemente era un remanente del monorepo original para leer configuraciones JSON pre-compiladas locales.
- **¿Cómo impactará la eliminación de `fs` en el entorno local?**
  - No debe impactar, ya que `getDefaultConfig(env)` tiene un fallback hacia las variables de entorno inyectadas (`process.env.DB_SERVER`, etc.) que están disponibles a través del script `npm run dev` usando `.env`.
- **¿Existen otros usos no reportados de `fs` o `path` en archivos cliente/isomórficos?**
  - Según la auditoría (AUDITORIA_2026_03_21), solo se reporta este hallazgo crítico en `src/lib/config.ts`.
