# Objetivos de Corrección: Auditoría 2026-03-18

## Resumen de Auditorías Recientes

La auditoría `AUDITORIA_2026_03_18.md` reveló el siguiente problema crítico que requiere atención inmediata.

### Hallazgos Consolidados

- **🔴 Crítico**: Fallo en la validación de tipos por falta de declaraciones de `@testing-library/jest-dom`. El compilador de TypeScript (`npx tsc --noEmit`) emite múltiples errores (`TS2339`) en los archivos de tests (`__tests__/components/shared/Button.test.tsx`, `components/shared/Input.spec.tsx`, etc.), ya que las propiedades como `toBeInTheDocument`, `toHaveTextContent`, etc., no son reconocidas como parte de `JestMatchers<HTMLElement>`.

## Priorización

- **Alta (Crítico)**: Solucionar los errores de compilación TypeScript relacionados a los tests (Jest-DOM) para asegurar la integridad de validación estática del proyecto.

## Criterios de Cierre (DoD)

1. El archivo `src/tsconfig.json` debe ser modificado para incluir `"jest.setup.js"` en el array `"include"`, resolviendo la falta de referencia de tipos globales de testing-library en Jest para TypeScript sin sobrescribir los packages.
2. El comando `cd src && npx tsc --noEmit` debe finalizar de manera exitosa, sin errores de `TS2339`.
3. El comando `cd src && npm run test` debe ejecutar los tests y pasar con éxito.
4. El comando `cd src && npm run build` debe finalizar exitosamente sin errores de compilación ni de Edge Runtime (`https`).
5. El comando `cd src && npm run lint` no debe generar advertencias ni errores.
6. Los cambios aplicados no deben introducir ninguna regresión al sistema de autenticación de `NextAuth` ni al despliegue estático de rutas (`export const dynamic = "force-dynamic"`).