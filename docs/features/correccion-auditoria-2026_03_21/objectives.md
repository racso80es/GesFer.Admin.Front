# Objetivos de Corrección: Auditoría 2026-03-21

## Propósito
Abordar y subsanar los hallazgos identificados en el documento de auditoría `docs/audits/AUDITORIA_2026_03_21.md`, eliminando deuda técnica y mejorando la resiliencia y estabilidad del proyecto en arquitecturas Edge o Isomórficas, garantizando el cumplimiento del patrón "Testability, Audit & Judge".

## Hallazgos Consolidados

### 1. Hallazgo Crítico (🔴): Uso Inadecuado de Sistema de Archivos en Entorno Isomórfico (`config.ts`)
- **Problema:** Empleo directo de dependencias en tiempo de ejecución de NodeJS (`fs`, `path`) mediante evaluación síncrona `fs.readFileSync` dentro de `src/lib/config.ts` (`loadConfig()`).
- **Impacto:** Genera errores en Edge Runtime o navegadores, violando principios de desacoplamiento de entorno de la aplicación.

### 2. Hallazgo Medio (🟡): Uso de Evaluación Dinámica `eval` en `server-fetch.ts`
- **Problema:** Utilización del hack `eval('import("https")')` en `src/lib/api/server-fetch.ts` como atajo de compilación.
- **Impacto:** Rompe las políticas estrictas en arquitecturas Edge y vulnera el análisis estático. Introduce inestabilidad y posible deuda de seguridad al utilizar métodos explícitamente bloqueados (como `eval` o `new Function`).

## Criterios de Cierre (DoD)

Para considerar estas correcciones finalizadas, se debe cumplir con:
1. Ninguna referencia explícita de `fs` o `path` se encuentra en el archivo `src/lib/config.ts`.
2. La carga de la configuración de entorno (`loadConfig`) está delegada directamente a `getDefaultConfig(env)` mediante el sistema establecido de variables de entorno.
3. El uso de `eval()` es reemplazado en su totalidad por el patrón de concatenación de cadena de módulo en tiempo de ejecución: `typeof process !== "undefined" ? (process as any).mainModule.require("ht" + "tps") : null;`.
4. Todos los comandos clave de auditoría superan sin fallos:
   - `npm run lint`
   - `npm run build`
   - `npm run test`