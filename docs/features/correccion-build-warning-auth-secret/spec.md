---
feature_id: correccion-build-warning-auth-secret
name: Corrección Advertencias de Build AUTH_SECRET
status: spec
type: bug-fix
components:
  - src/lib/env.ts
dependencies: []
---
# Especificación de la Corrección: Build Warnings de AUTH_SECRET

Este documento detalla la corrección técnica referida en `AUDITORIA_2026_03_19.md` que involucra un mensaje de advertencia repetitivo del secreto de autenticación.

## 1. Problema

El proyecto está imprimiendo `⚠️ [BUILD/CI] Ignorando falta de variable requerida: AUTH_SECRET` durante el proceso de compilación (`next build`). La advertencia se emite desde la función `requireEnv` en `src/lib/env.ts`, diseñada para evitar que el compilador se detenga por una variable de entorno faltante. El framework de Next.js renderiza estáticamente las páginas de `login.tsx` y otras, lo que, en su evaluación inicial del archivo `auth.ts`, invoca repetidamente la lectura del entorno.

El mensaje en consola es redundante porque el sistema de compilación y CI están diseñados para operar sin un `AUTH_SECRET` verdadero. Sin embargo, no necesitamos ver el log de esta excepción prevista.

## 2. Solución Propuesta

Comentar o remover la línea `console.warn` en la función `requireEnv` del archivo `src/lib/env.ts` de modo que el "dummy-value" se devuelva silenciosamente durante los pipelines CI y de compilación estática.

```typescript
// function requireEnv(...) en src/lib/env.ts
if (process.env.npm_lifecycle_event === "build" || process.env.CI) {
    return "dummy-value-for-build";
}
```

## 3. Impacto y Riesgos

- **Riesgo**: Se pierde la alerta visual en CI de que se está omitiendo la variable, pero al ser un comportamiento esperado (se documenta en el código mismo el porqué), el impacto del ocultamiento es benigno y preferible a saturar los logs.
- **Impacto Positivo**: Logs limpios, menos fatiga por falsos positivos de fallos en el sistema de integración continua.