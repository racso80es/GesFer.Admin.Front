# Tarea automatizada: Refactorización de tipado en sanitizeLogMessage

**Origen:** PR rama `fix/code-health-logger-15121670877633628854` (proceso validate-pull-requests)

**Agente detector:** qa-judge

## Contexto

`sanitizeLogMessage` declara `message: string` y retorno `string`, pero incluye retorno temprano cuando `typeof message !== "string"` y los tests usan `@ts-expect-error` con `null`/`undefined`.

## Objetivo del refactor (S+ Grade)

Unificar contrato de API pública: o bien restringir a `string` y eliminar el test de no-string, o bien tipar explícitamente entrada/salida opcional y documentar el comportamiento.

## Instrucciones para Tekton

1. Decidir contrato final (solo `string` vs entrada amplia).
2. Ajustar implementación y tests para que no dependan de `@ts-expect-error` salvo que el contrato lo justifique.
3. Ejecutar `npm test -- --testPathPattern=logger.test.ts` desde `src/`.
