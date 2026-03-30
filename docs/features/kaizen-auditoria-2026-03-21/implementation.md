# Implementación

- Se modificó la función `loadConfig` en `src/lib/config.ts`.
- Se eliminó el bloque `if` que validaba Node.js y contenía la lógica dinámica para usar `fs` y `path`.
- La función ahora depende exclusivamente del fallback directo al método `getDefaultConfig(env)`, asegurando que la configuración sea siempre puramente inyectada por variables de entorno sin intentar accesos locales al sistema de archivos, cumpliendo el principio Edge y Testability.