# Objetivos: Corrección de Auditoría 2026-03-17

## 1. Propósito
El objetivo principal de esta tarea es solucionar los hallazgos críticos detectados en la auditoría técnica del 2026-03-17, específicamente el fallo de compilación en el build de Next.js. El error `DYNAMIC_SERVER_USAGE` ocurre porque el framework intenta pre-renderizar rutas de API (`/api/admin/dashboard/summary`, `/api/companies`, y `/api/companies/[id]`) de manera estática, pero estas rutas consumen headers y cookies para obtener la sesión del usuario mediante la función `auth()` de NextAuth.

## 2. Hallazgos a Resolver
- **🔴 Crítico**: Fallo en `npm run build` durante la generación de páginas estáticas. Las rutas API deben ser forzadas como dinámicas agregando el export statement correspondiente de Next.js.

## 3. Criterios de Aceptación (Definition of Done)
1. Modificar `src/app/api/admin/dashboard/summary/route.ts` para incluir `export const dynamic = "force-dynamic";`.
2. Modificar `src/app/api/companies/route.ts` para incluir `export const dynamic = "force-dynamic";`.
3. Modificar `src/app/api/companies/[id]/route.ts` para incluir `export const dynamic = "force-dynamic";`.
4. El proceso de build (`npm run build`) en la carpeta `src` finaliza exitosamente.
5. Todos los tests de la suite (`npm run test`) deben continuar pasando sin error.
6. El linter (`npm run lint`) no debe emitir warnings ni errores en los archivos modificados.