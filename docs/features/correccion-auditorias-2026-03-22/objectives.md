# Objetivos: Corrección de Auditoría 2026-03-22

## Hallazgo Principal (del reporte 2026-03-19)
Fallo en validación de tipos por falta de declaraciones de `@testing-library/jest-dom`.

## Objetivo
Resolver los errores `TS2339` que se presentan en los archivos de test (`__tests__/components/shared/Button.test.tsx`, `components/shared/Input.spec.tsx`, etc.) al ejecutar `npx tsc --noEmit`. El compilador de TypeScript no carga correctamente los tipos de `@testing-library/jest-dom`, por lo que aserciones como `toBeInTheDocument` o `toHaveTextContent` son reportadas como no existentes en `JestMatchers<HTMLElement>`.

## Alcance y Criterios de Cierre
- Modificar el archivo `src/tsconfig.json` para incluir `"jest.setup.js"` dentro de la propiedad `"include"`.
- Validar que `cd src && npx tsc --noEmit` se ejecute de manera exitosa sin lanzar errores TS2339.
- Asegurar que la suite de pruebas unitarias (`cd src && npm run test`) pasa de forma consistente tras este cambio.
