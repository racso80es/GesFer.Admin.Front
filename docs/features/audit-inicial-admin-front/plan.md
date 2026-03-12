# PLAN — Saneamiento y Adaptación de GesFer.Admin.Front

> **Acción:** planning  
> **Fecha:** 2026-03-12  
> **Spec:** spec.md | **Clarify:** clarify.md (confirmado)  
> **Estado:** planning (Fase 1 aplicada; Fase 2 aplicada; Fase 3 pendiente)

---

## 1. Resumen ejecutivo

Este plan convierte la especificación (9 SPECs) y las clarificaciones confirmadas en una hoja de ruta ejecutable de **3 fases y 27 tareas**. El orden de fases prioriza el contexto IA sobre el código (CL-PRIO confirmado).

**Estimación global:** 3 fases secuenciales. Cada fase puede ejecutarse en una o varias sesiones.

## 1.1 Estado de ejecución de fases

| Fase | Estado | Fuente |
|------|--------|--------|
| **Fase 1 — P0 Contexto IA** | **Aplicada en la rama actual** | Confirmación de usuario + clarificación `CL-PRIO-STATE` |
| **Fase 2 — P1 Infraestructura CI/CD** | **Aplicada en la rama actual** | Ejecución verificada (CHECK-F2.1 a CHECK-F2.8) |
| **Fase 3 — P2 Código fuente** | **Pendiente / siguiente fase a ejecutar** | Este plan |

**Implicación operativa para Fase 2:** Se ejecuta con la precondición de contexto IA ya saneado. La validación de Fase 2 debe evitar reintroducir referencias de backend o mover implementaciones ejecutables fuera de `scripts/`.

---

## 2. Fase 1 — P0: Contexto IA (SPEC-05, SPEC-06, SPEC-09)

> **Objetivo:** Que todos los agentes, constituciones y documentación reflejen GesFer.Admin.Front como proyecto frontend Next.js.
> **Estado actual:** Aplicada.

### TAREA 1.1 — Actualizar agentes SddIA [SPEC-05]

**Archivos a modificar:**

| # | Archivo | Cambios concretos |
|---|---------|-------------------|
| 1.1.1 | `SddIA/agents/tekton-developer.json` | Eliminar instrucciones C# (try/catch C#, dotnet build Back). Reemplazar skill `dotnet-development` por `frontend-build`. Añadir instrucciones TypeScript/Next.js equivalentes. |
| 1.1.2 | `SddIA/agents/qa-judge.json` | Reemplazar skill `dotnet-development` por `frontend-build`. Cambiar `dotnet test` por `npm run test` / `npm run build` / `next lint`. |
| 1.1.3 | `SddIA/agents/auditor/auditor.json` | Actualizar `description` y `system_prompt`: eliminar "backend (C#, DbContext)", "CS1998", "Command Pattern". Mantener y potenciar WCAG, path mapping, accesibilidad. Actualizar constraints para contexto frontend. |
| 1.1.4 | `SddIA/agents/performance-engineer.json` | Eliminar refs a IAsyncLogPublisher, N+1 EF Core, Alpine/Distroless. Reemplazar por Core Web Vitals, bundle size, lazy loading, Image optimization. |
| 1.1.5 | `SddIA/agents/security-engineer.json` | Eliminar refs a ValueObjects, Seeds/MassLoad, CanDeleteUsers backend. Eliminar ruta absoluta `C:\Proyectos\GesFer\logs`. Actualizar a seguridad frontend (XSS, CSP, auth tokens, CORS). |
| 1.1.6 | `SddIA/agents/architect.json` | Actualizar `allowed_paths` a estructura real: `src/app/`, `src/components/`, `src/lib/`, `src/contexts/`. |

**Verificación:**
- Grep en `SddIA/agents/`: cero matches de `dotnet`, `C#`, `DbContext`, `.sln`, `.csproj`, `EF Core`, `GesFer.Admin.Back`.
- Cada agente modificado tiene `system_prompt` y `instructions` coherentes con frontend.

---

### TAREA 1.2 — Actualizar constituciones [SPEC-06]

**Archivos a modificar:**

| # | Archivo | Cambios concretos |
|---|---------|-------------------|
| 1.2.1 | `SddIA/CONSTITUTION.md` | Título: "GesFer.Admin.Back" → "GesFer.Admin.Front". Contenido: refs a backend → frontend Next.js. |
| 1.2.2 | `SddIA/constitution/constitution.architect.md` | "src/ (proyectos .NET)" → "src/ (Next.js App Router)". |
| 1.2.3 | `SddIA/constitution/constitution.architect.json` | `location` → "src/ (GesFer.Admin.Front; Next.js App Router)". |
| 1.2.4 | `SddIA/constitution/constitution.audity.md` | "GesFer.Admin.Back: Auditoría vía SddIA" → "GesFer.Admin.Front: Auditoría frontend vía SddIA". |
| 1.2.5 | `SddIA/constitution/constitution.audity.json` | `loggerPath` → adaptar a contexto frontend. |
| 1.2.6 | `SddIA/constitution/constitution.cognitive.md` | "GesFer.Admin.Back: Persistencia en base de datos" → "GesFer.Admin.Front: Estado vía React Query / contextos". |
| 1.2.7 | `SddIA/constitution/constitution.cognitive.json` | `storagePath` → adaptar a contexto frontend. |
| 1.2.8 | `SddIA/constitution/constitution.duality.md` | "GesFer.Admin.Back: No aplica IPC Electron" → "GesFer.Admin.Front: No aplica IPC (frontend web)". |
| 1.2.9 | `SddIA/constitution/constitution.duality.json` | `ipcBridge` → "N/A (GesFer.Admin.Front; web frontend)". |

**Verificación:**
- Grep en `SddIA/constitution/` y `SddIA/CONSTITUTION.md`: cero matches de `GesFer.Admin.Back`.

---

### TAREA 1.3 — Actualizar manifesto [SPEC-06]

| # | Archivo | Cambios concretos |
|---|---------|-------------------|
| 1.3.1 | `SddIA/manifesto.json` | Eliminar `dependency_rules.backend` (refs a GesFer.Product.Back, GesFer.Admin.Back, Shared.Back). Actualizar `architecture_pillars` a estructura frontend (`src/app/`, `src/components/`, `src/lib/`). Eliminar `seed_taxonomy`. Actualizar `dependency_rules.frontend` (eliminar refs a `src/Product/Front/`, `src/Admin/Front/`; adaptar a estructura actual). |

**Verificación:**
- JSON válido tras edición.
- Cero refs a `.Back`, `Product`, `Seeds` en el manifiesto.

---

### TAREA 1.4 — Actualizar normas y protocolo PR [SPEC-06]

| # | Archivo | Cambios concretos |
|---|---------|-------------------|
| 1.4.1 | `SddIA/norms/pr-acceptance-protocol.md` | `dotnet build src/GesFer.Admin.Back.sln` → `npm run build`. `dotnet test` → `npm run test`. Añadir `npm run lint`. |

**Verificación:**
- Cero refs a `dotnet`, `.sln` en el protocolo.

---

### TAREA 1.5 — Actualizar documentación general [SPEC-09]

| # | Archivo | Cambios concretos |
|---|---------|-------------------|
| 1.5.1 | `Objetivos.md` (raíz) | Reescribir: describir GesFer.Admin.Front como frontend Admin independiente. Referencia histórica al monorepo. |
| 1.5.2 | `SddIA/skills/invoke-command/spec.json` | `"contexto": { "default": "GesFer" }` → `"contexto": { "default": "GesFer.Admin.Front" }`. |
| 1.5.3 | `SddIA/skills/invoke-command/spec.md` | Actualizar contexto default a "GesFer.Admin.Front". |
| 1.5.4 | `SddIA/skills/invoke-commit/spec.json` | Ídem: contexto default → "GesFer.Admin.Front". |
| 1.5.5 | `SddIA/skills/invoke-commit/spec.md` | Ídem. |
| 1.5.6 | `SddIA/templates/spec-template.md` | "sistema GesFer" → "proyecto GesFer.Admin.Front". |

**Verificación:**
- `Objetivos.md` describe el proyecto frontend.
- Grep `"default": "GesFer"` en skills: cero matches (debe ser `GesFer.Admin.Front`).

---

### Verificación global Fase 1

```
[CHECK-F1.1] Grep SddIA/ → cero "GesFer.Admin.Back" (excepto docs históricos explícitos)
[CHECK-F1.2] Grep SddIA/agents/ → cero "dotnet", "C#", "DbContext", ".sln", ".csproj"
[CHECK-F1.3] Grep SddIA/constitution/ → cero "GesFer.Admin.Back"
[CHECK-F1.4] Grep SddIA/manifesto.json → cero ".Back", "Seeds"
[CHECK-F1.5] Objetivos.md describe frontend
```

---

## 3. Fase 2 — P1: Infraestructura CI/CD (SPEC-04, SPEC-08, SPEC-03)

> **Objetivo:** Scripts, tools y workflow funcionan para un proyecto frontend Next.js.
> **Precondición satisfecha:** Fase 1 aplicada.
> **Restricción adicional confirmada:** `scripts/` contiene implementaciones ejecutables de skills/tools; `SddIA/` mantiene definición y documentación; `src/` solo contiene código funcional del Admin Front.

### TAREA 2.1 — Adaptar scripts [SPEC-04]

| # | Archivo | Acción | Cambios concretos |
|---|---------|--------|-------------------|
| 2.1.1 | `scripts/ejecutar-tests.ps1` | Adaptar | Reemplazar `dotnet test src/GesFer.Admin.Back.IntegrationTests/` por `npm run test` (working dir: `src/`). |
| 2.1.2 | `scripts/Run-E2ELocal.ps1` | Adaptar | Eliminar refs a `.sln`, `.csproj`, `dotnet`. Reemplazar por `npm run test:e2e` con Playwright. |
| 2.1.3 | `scripts/validate-services-and-health.ps1` | Adaptar | Eliminar refs a Product Back, Admin Back. Mantener health check solo para frontend (puerto 3001). |
| 2.1.4 | `scripts/install-front-dependencies.ps1` | Simplificar | Solo `npm install` en `src/`. Eliminar refs a `src/Product/Front`, `src/Admin/Front`. |
| 2.1.5 | `scripts/cerrar-procesos-servicios.ps1` | Adaptar | Solo puertos frontend (3001). Eliminar refs a 5000, 5010. |
| 2.1.6 | `scripts/run-service-with-log.ps1` | Adaptar | Ejemplos: `npm run dev` en lugar de ProductApi, AdminApi. |
| 2.1.7 | `scripts/README-E2E.md` | Reescribir | Contexto frontend: Playwright, npm scripts, puerto 3001. Eliminar refs a GesFer.Admin.Back y rutas absolutas. |
| 2.1.8 | `scripts/skills/pr-skill.sh` | Adaptar | `dotnet build` → `npm run build`. `dotnet test` → `npm run test`. Mantener `.sh` en esta iteración. |
| 2.1.9 | `scripts/skills/commit-skill.sh` | Adaptar | `*UnitTests.csproj` → `npm run test`. Mantener `.sh` en esta iteración. |
| 2.1.10 | `scripts/skills/pr-skill.md` | Adaptar | Documentación: refs a dotnet → npm. |

**Verificación:**
- Grep en `scripts/`: cero matches de `dotnet`, `.sln`, `.csproj`, `GesFer.Admin.Back`, `src/Product/`, `src/Admin/`.
- Grep en `scripts/skills/pr-skill.*` y `commit-skill.sh`: cero refs a dotnet.

---

### TAREA 2.2 — Reescribir/eliminar tools [SPEC-08]

| # | Acción | Archivos | Cambios concretos |
|---|--------|----------|-------------------|
| 2.2.1 | **Eliminar** | `scripts/tools/invoke-mysql-seeds/` (carpeta completa) | Eliminar carpeta. |
| 2.2.2 | **Eliminar** | `SddIA/tools/invoke-mysql-seeds/` (definición) | Eliminar carpeta. |
| 2.2.3 | **Eliminar** | `scripts/tools/postman-mcp-validation/` (carpeta completa) | Eliminar carpeta. |
| 2.2.4 | **Eliminar** | `SddIA/tools/postman-mcp-validation/` (definición) | Eliminar carpeta. |
| 2.2.5 | **Reescribir** | `scripts/tools/start-api/` → renombrar a `start-frontend/` | Config: `npm run dev`, puerto 3001, health `http://localhost:3001`. |
| 2.2.6 | **Reescribir** | `SddIA/tools/start-api/` → renombrar a `start-frontend/` | Actualizar spec.md y spec.json. |
| 2.2.7 | **Reescribir** | `scripts/tools/run-tests-local/` → renombrar a `run-tests-frontend/` | Config: `npm test`, `npm run test:e2e`, `npm run build`. |
| 2.2.8 | **Reescribir** | `SddIA/tools/run-tests-local/` → renombrar a `run-tests-frontend/` | Actualizar spec.md y spec.json. |
| 2.2.9 | **Simplificar** | `scripts/tools/prepare-full-env/` → renombrar a `prepare-frontend-env/` | Solo `npm install` + verificación `.env`. Eliminar Docker/MySQL/dotnet. |
| 2.2.10 | **Simplificar** | `SddIA/tools/prepare-full-env/` → renombrar a `prepare-frontend-env/` | Actualizar spec.md y spec.json. |

**Verificación:**
- Carpetas eliminadas no existen.
- Las implementaciones ejecutables residen en `scripts/tools/`.
- Las definiciones en `SddIA/tools/` quedan sincronizadas con la implementación.
- Nuevas tools ejecutan correctamente (dry-run).

---

### TAREA 2.3 — Actualizar índices de tools [SPEC-08]

| # | Archivo | Cambios concretos |
|---|---------|-------------------|
| 2.3.1 | `scripts/tools/index.json` | Eliminar entradas de `invoke-mysql-seeds`, `postman-mcp-validation`. Renombrar `start-api` → `start-frontend`, `run-tests-local` → `run-tests-frontend`, `prepare-full-env` → `prepare-frontend-env`. |
| 2.3.2 | `SddIA/agents/cumulo.paths.json` | Actualizar `toolCapsules`: eliminar `invoke-mysql-seeds`, `postman-mcp-validation`. Renombrar las 3 tools. |
| 2.3.3 | `SddIA/tools/` (definiciones) | Verificar que solo existan carpetas de tools vigentes. |

**Verificación:**
- `index.json` y `cumulo.paths.json` son JSON válidos.
- Todas las entradas en `toolCapsules` apuntan a carpetas existentes.

---

### TAREA 2.4 — Adaptar GitHub Workflow [SPEC-03]

| # | Archivo | Cambios concretos |
|---|---------|-------------------|
| 2.4.1 | `.github/workflows/pr-validation.yml` | Eliminar setup .NET 8, setup Rust, `verify_pr_protocol`. Añadir: `actions/setup-node@v4` (node 20), `npm ci` (working-directory: src), `npm run lint`, `npm run build`, `npm run test`. Mantener `validate-nomenclatura.ps1` si es genérico. |

**Verificación:**
- Workflow YAML es válido (yamllint o similar).
- Sin refs a dotnet, Rust, `.sln`.

---

### Verificación global Fase 2

```
[CHECK-F2.1] Grep scripts/ → cero "dotnet", ".sln", ".csproj", "GesFer.Admin.Back"
[CHECK-F2.2] Grep scripts/ → cero "src/Product/", "src/Admin/" (como rutas de monorepo)
[CHECK-F2.3] scripts/tools/ solo contiene: start-frontend/, run-tests-frontend/, prepare-frontend-env/
[CHECK-F2.4] SddIA/tools/ solo contiene definiciones de tools vigentes
[CHECK-F2.5] .github/workflows/pr-validation.yml usa Node.js, no .NET
[CHECK-F2.6] cumulo.paths.json → toolCapsules apuntan a carpetas existentes
[CHECK-F2.7] scripts/skills/ mantiene las implementaciones ejecutables de skill afectadas
[CHECK-F2.8] El estado documental de fases queda actualizado al cierre (F1 aplicada, F2 aplicada/validada si procede, F3 pendiente)
```

---

## 4. Fase 3 — P2: Código fuente (SPEC-01, SPEC-02, SPEC-07)

> **Objetivo:** El proyecto compila, pasa tests y se construye como contenedor independiente.

### TAREA 3.1 — Internalizar componentes UI desde TmpMigration [SPEC-01]

| # | Origen (TmpMigration) | Destino | Acción |
|---|----------------------|---------|--------|
| 3.1.1 | `components/ui/card.tsx` | `src/components/ui/card.tsx` | Copiar (nuevo) |
| 3.1.2 | `components/ui/loading.tsx` | `src/components/ui/loading.tsx` | Copiar (nuevo) |
| 3.1.3 | `components/ui/button.tsx` | `src/components/ui/button.tsx` | Reemplazar (Shared superior) |
| 3.1.4 | `components/ui/input.tsx` | `src/components/ui/input.tsx` | Reemplazar (unificar) |
| 3.1.5 | `components/ui/label.tsx` | `src/components/ui/label.tsx` | Reemplazar (unificar) |
| 3.1.6 | `components/ui/error-message.tsx` | `src/components/ui/error-message.tsx` | Reemplazar (Shared superior) |
| 3.1.7 | `components/ui/dialog.tsx` | `src/components/ui/dialog.tsx` | Copiar (nuevo) |
| 3.1.8 | `components/ui/alert-dialog.tsx` | `src/components/ui/alert-dialog.tsx` | Copiar (nuevo) |
| 3.1.9 | `components/ui/form.tsx` | `src/components/ui/form.tsx` | Copiar (nuevo) |
| 3.1.10 | `components/ui/select.tsx` | `src/components/ui/select.tsx` | Copiar (nuevo) |
| 3.1.11 | `components/ui/table.tsx` | `src/components/ui/table.tsx` | Copiar (nuevo) |
| 3.1.12 | `components/ui/overlay-fix.tsx` | `src/components/ui/overlay-fix.tsx` | Copiar (nuevo) |

**Post-copia:** Actualizar imports internos de rutas relativas a alias `@/`:
- `../../lib/utils/cn` → `@/lib/utils/cn`

---

### TAREA 3.2 — Internalizar componentes Shared desde TmpMigration [SPEC-01]

| # | Origen (TmpMigration) | Destino | Acción |
|---|----------------------|---------|--------|
| 3.2.1 | `components/shared/Button.tsx` | `src/components/shared/Button.tsx` | Copiar |
| 3.2.2 | `components/shared/Button.spec.tsx` | `src/components/shared/Button.spec.tsx` | Copiar |
| 3.2.3 | `components/shared/DataTable.tsx` | `src/components/shared/DataTable.tsx` | Copiar |
| 3.2.4 | `components/shared/DestructiveActionConfirm.tsx` | `src/components/shared/DestructiveActionConfirm.tsx` | Copiar |
| 3.2.5 | `components/shared/Input.tsx` | `src/components/shared/Input.tsx` | Copiar |
| 3.2.6 | `components/shared/Input.spec.tsx` | `src/components/shared/Input.spec.tsx` | Copiar |
| 3.2.7 | `components/shared/ModalBase.tsx` | `src/components/shared/ModalBase.tsx` | Copiar |

**Post-copia:** Actualizar imports internos:
- `../ui/dialog` → `@/components/ui/dialog`
- `../ui/button` → `@/components/ui/button`
- `../ui/input` → `@/components/ui/input`
- `../ui/label` → `@/components/ui/label`
- `../../lib/utils/cn` → `@/lib/utils/cn`

---

### TAREA 3.3 — Verificar utilidades [SPEC-01]

| # | Archivo | Acción |
|---|---------|--------|
| 3.3.1 | `lib/utils/cn.ts` | Comparar local vs TmpMigration. Si idénticos, mantener local. Si difiere, usar el más completo. |
| 3.3.2 | `lib/types/api.ts` | Evaluar si Country/City son relevantes para Admin. Si sí, copiar a `src/lib/types/api.ts`. Si no, descartar. |

---

### TAREA 3.4 — Actualizar imports en consumidores [SPEC-01]

| # | Archivo | Cambio |
|---|---------|--------|
| 3.4.1 | `src/app/login/page.tsx` | 5 imports `@shared/components/ui/*` → `@/components/ui/*` |
| 3.4.2 | `src/app/dashboard/page.tsx` | 3 imports `@shared/components/ui/*` → `@/components/ui/*` |
| 3.4.3 | `src/components/layout/Sidebar.tsx` | `@shared/components/shared/Button` → `@/components/shared/Button` |
| 3.4.4 | `src/components/layout/admin-layout.tsx` | `@shared/components/shared/Button` → `@/components/shared/Button` |
| 3.4.5 | `src/components/layout/admin-app-wrapper.tsx` | `@shared/components/ui/loading` → `@/components/ui/loading` |
| 3.4.6 | `src/__tests__/components/shared/Button.test.tsx` | `@shared/components/shared/Button` → `@/components/shared/Button` |

---

### TAREA 3.5 — Actualizar configuraciones [SPEC-01]

| # | Archivo | Cambio |
|---|---------|--------|
| 3.5.1 | `src/tsconfig.json` | Eliminar paths `@shared/*`, `@shared/types/*`. Eliminar `../../Shared/Front/**/*.ts(x)` de `include`. Mantener paths de paquetes explícitos (cva, clsx, etc.) si son necesarios. |
| 3.5.2 | `src/tailwind.config.ts` | Eliminar `"../../Shared/Front/**/*.{js,ts,jsx,tsx,mdx}"` de `content`. |
| 3.5.3 | `src/jest.config.js` | Eliminar moduleNameMapper `'^@shared/(.*)$'`. |

---

### TAREA 3.6 — Adaptar Dockerfile [SPEC-02]

| # | Archivo | Cambio |
|---|---------|--------|
| 3.6.1 | `src/Dockerfile` | Reescribir para estructura standalone. Eliminar rutas `src/Admin/Front/`, `src/Shared/Front/`. Base: copiar package*.json, npm ci, copiar src/, npm run build, copiar standalone. Eliminar `COPY --from=builder .../public ./public` (no existe). |

---

### TAREA 3.7 — Unificar URLs y puertos [SPEC-07]

| # | Archivo | Cambio |
|---|---------|--------|
| 3.7.1 | `src/auth.ts` | Fallback → `https://localhost:5011` (no `http://localhost:5010`). |
| 3.7.2 | `src/lib/api/admin-api.ts` | Fallback → `https://localhost:5011`. |
| 3.7.3 | `src/lib/api/admin-api-server.ts` | Fallback → `https://localhost:5011`. |
| 3.7.4 | `src/app/dashboard/page.tsx` | Eliminar ref a `localhost:5000`. Reemplazar por API Admin o placeholder. |
| 3.7.5 | `src/README.md` | Corregir puerto documentado (5001 → 5011 o eliminar fallback hardcoded). |
| 3.7.6 | `src/lib/config.ts` | Revisar y unificar URLs hardcoded. Centralizar definición. |

---

### TAREA 3.8 — Limpieza final [SPEC-01]

| # | Acción |
|---|--------|
| 3.8.1 | Ejecutar `npm run build` → verificar éxito. |
| 3.8.2 | Ejecutar `npm run test` → verificar que pasan. |
| 3.8.3 | Ejecutar `npm run lint` → verificar sin errores. |
| 3.8.4 | Eliminar `src/TmpMigration/` (carpeta completa). |
| 3.8.5 | Ejecutar `npm run build` de nuevo (sin TmpMigration) → confirmar independencia. |

---

### Verificación global Fase 3

```
[CHECK-F3.1] npm run build → éxito
[CHECK-F3.2] npm run test → todos pasan
[CHECK-F3.3] npm run lint → sin errores
[CHECK-F3.4] Grep src/ → cero "@shared/"
[CHECK-F3.5] Grep src/ → cero "../../Shared/"
[CHECK-F3.6] Grep src/ → cero "localhost:5000"
[CHECK-F3.7] src/TmpMigration/ no existe
[CHECK-F3.8] docker build → éxito (si Docker disponible)
```

---

## 5. Criterios de aceptación (trazabilidad)

| AC | Criterio | Fase | Verificación |
|----|----------|------|-------------|
| AC-01 | `npm run build` exitoso | Fase 3 | CHECK-F3.1 |
| AC-02 | `npm run test` pasan | Fase 3 | CHECK-F3.2 |
| AC-03 | `npm run lint` sin errores | Fase 3 | CHECK-F3.3 |
| AC-04 | `docker build` exitoso | Fase 3 | CHECK-F3.8 |
| AC-05 | Cero `@shared/` en imports | Fase 3 | CHECK-F3.4 |
| AC-06 | Cero `../../Shared/` en configs | Fase 3 | CHECK-F3.5 |
| AC-07 | Cero refs backend en SddIA y scripts | Fase 1 + 2 | CHECK-F1.1..F2.2 |
| AC-08 | Cero `localhost:5000` | Fase 3 | CHECK-F3.6 |
| AC-09 | `TmpMigration/` eliminada | Fase 3 | CHECK-F3.7 |
| AC-10 | Workflow adaptado a Node.js | Fase 2 | CHECK-F2.5 |

---

## 6. Seguridad

| Aspecto | Estado | Acción |
|---------|--------|--------|
| `.env` en `.gitignore` | OK | Mantener. |
| `.env.example` con credenciales seeds | Aceptable (dev) | Documentar que son solo para desarrollo local. |
| `AUTH_SECRET` | Pendiente en prod | No bloquea este plan; registrar como deuda. |
| `DestructiveActionConfirm` | Se internaliza en Fase 3 | Patrón Vision Zero disponible. |
| CSP / XSS | No evaluado | Planificar auditoría específica post-saneamiento. |

---

## 7. Resumen de tareas por fase

| Fase | Tareas | Archivos impactados |
|------|--------|---------------------|
| **Fase 1** (P0 — Contexto IA) | 1.1 a 1.5 (19 sub-tareas) | ~22 archivos en SddIA/ y raíz |
| **Fase 2** (P1 — CI/CD) | 2.1 a 2.4 (15 sub-tareas) | ~20 archivos en scripts/, SddIA/tools/, .github/ |
| **Fase 3** (P2 — Código) | 3.1 a 3.8 (31 sub-tareas) | ~30 archivos en src/ |
| **Total** | **27 tareas, 65 sub-tareas** | **~72 archivos** |
