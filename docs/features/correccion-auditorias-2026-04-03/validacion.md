# Validación de Corrección: 2026-04-03

## Criterios de Aceptación

1.  **Revisión Visual:** Los archivos modificados (`src/app/companies/new/page.tsx` y `src/app/companies/[id]/edit/page.tsx`) deben contener exclusivamente el import con el alias `@/` para el componente `CompanyForm`.
2.  **Verificación Estructural:** La ejecución de `cd src && npx tsc --noEmit` no debe arrojar errores de compilación asociados a las importaciones corregidas.
3.  **Verificación de Build:** La ejecución de `cd src && npm run build` debe completar sin errores, demostrando que Next.js puede resolver las rutas de los componentes usando el alias `@/`.