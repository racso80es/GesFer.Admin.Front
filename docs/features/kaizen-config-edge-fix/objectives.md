# Objetivos

- **Objetivo Principal:** Eliminar el uso dinámico e inadecuado de dependencias de Node.js (`fs`, `path`) en `src/lib/config.ts`.
- **Criterios de Aceptación (DoD):**
  - El archivo `src/lib/config.ts` no contiene referencias a `fs` ni a `path`.
  - La función `loadConfig()` se basa únicamente en `getDefaultConfig(env)`.
  - El proceso de construcción de Next.js (`npm run build`) no arroja fallos debidos a este cambio.