# Implementación: fix-config-fs-dependency

## Archivos Modificados
1. `src/lib/config.ts`

## Acciones Realizadas
1. Se localizó la función `loadConfig()` en `src/lib/config.ts`.
2. Se eliminó por completo el bloque condicional que verificaba el entorno (node/edge) e inyectaba dinámicamente (`__non_webpack_require__` / `module.require`) los módulos de Node.js `fs` y `path`.
3. Se borró la lógica que leía archivos estáticos `.json` del sistema de archivos mediante `fs.readFileSync` y `path.join`.
4. Se simplificó el bloque `try-catch` para que retorne directa y únicamente la configuración obtenida mediante variables de entorno a través de `getDefaultConfig(env)`.

## Notas de Desarrollo
- La refactorización elimina la causa raíz de la inestabilidad al hacer build y desplegar en entornos Edge.
- El sistema ahora sigue una arquitectura Twelve-Factor pura en cuanto a la inyección de configuraciones, dependiendo exclusivamente del objeto global `process.env`.
