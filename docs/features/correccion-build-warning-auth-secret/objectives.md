# Objetivos de Corrección: Build Warnings de AUTH_SECRET

**Origen:** `docs/audits/AUDITORIA_2026_03_19.md`

## 1. Contexto y Hallazgos
El comando `npm run build` emite repetidamente la advertencia `⚠️ [BUILD/CI] Ignorando falta de variable requerida: AUTH_SECRET`. Este mensaje es generado en tiempo estático por la función `requireEnv` dentro de `src/lib/env.ts`, generando ruido visual innecesario en los logs de pipeline y compilación, sabiendo que en estático NextAuth no debería tener inicializado un secreto válido.

## 2. Prioridad
🟡 Medio: Es ruido de log en la infraestructura de CI, no es un fallo funcional, pero la auditoría lo destaca para limpieza y eficiencia.

## 3. Alcance de la Resolución
- Modificar la función `requireEnv` en `src/lib/env.ts` para retornar `"dummy-value-for-build"` silenciosamente cuando `process.env.npm_lifecycle_event === "build"` o `process.env.CI` sean válidos, eliminando el `console.warn`.
- Ejecutar compilación para confirmar logs limpios.

## 4. Criterios de Cierre (DoD)
- [x] Modificación de `requireEnv` en `src/lib/env.ts` completa sin `console.warn`.
- [x] Compilación TS sin warnings repetitivas de AUTH_SECRET (`npm run build`).
- [x] Resto de flujos exitosos (Test, Lint).