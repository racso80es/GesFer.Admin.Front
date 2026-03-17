# Auditoría de Infraestructura y Estabilidad - 2026-03-17

## 1. Métricas de Salud (0-100%)
Arquitectura: 90% | Nomenclatura: 95% | Estabilidad Async: 85%

## 2. Pain Points (🔴 Críticos / 🟡 Medios)

**🔴 Crítico: Fallo en compilación estática de Next.js por uso dinámico en rutas de API.**
- Hallazgo: El comando `npm run build` falla debido a que Next.js intenta pre-renderizar estáticamente las rutas de API (`/api/admin/dashboard/summary`, `/api/companies`, y `/api/companies/[id]`). Estas rutas hacen uso de `auth()` de NextAuth, lo cual consulta `headers` y cookies de sesión. Esto provoca un error `DYNAMIC_SERVER_USAGE` porque en Next.js App Router una ruta no puede generarse estáticamente si usa funciones dinámicas (como headers/cookies) y no se marca explícitamente como dinámica.
- Ubicación:
  - `src/app/api/admin/dashboard/summary/route.ts` (línea 1)
  - `src/app/api/companies/route.ts` (línea 1)
  - `src/app/api/companies/[id]/route.ts` (línea 1)

## 3. Acciones Kaizen (Hoja de Ruta para el Executor)

**Instrucciones para el Kaizen Executor (Agente Tekton):**
1. Debes modificar los tres archivos de rutas de la API listados en los hallazgos.
2. Agrega la siguiente línea al principio de cada archivo, justo después de los imports, para forzar que Next.js trate estas rutas como dinámicas y no intente pre-renderizarlas estáticamente en el build:
   ```typescript
   export const dynamic = "force-dynamic";
   ```

**Definition of Done (DoD):**
- [ ] La línea `export const dynamic = "force-dynamic";` ha sido agregada en `src/app/api/admin/dashboard/summary/route.ts`.
- [ ] La línea `export const dynamic = "force-dynamic";` ha sido agregada en `src/app/api/companies/route.ts`.
- [ ] La línea `export const dynamic = "force-dynamic";` ha sido agregada en `src/app/api/companies/[id]/route.ts`.
- [ ] El comando `cd src && npm run build` finaliza de manera exitosa sin errores de `DYNAMIC_SERVER_USAGE`.
- [ ] Todos los tests (`npm run test`) y la verificación de linting (`npm run lint`) pasan correctamente.