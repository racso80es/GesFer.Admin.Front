# SPEC — Saneamiento y Adaptación de GesFer.Admin.Front

> **Acción:** spec  
> **Fecha:** 2026-03-12  
> **Context:** docs/features/audit-inicial-admin-front/  
> **Origen:** objectives.md (OBJ-01 a OBJ-06)  
> **Estado:** spec

---

## 1. Contexto

**GesFer.Admin.Front** es un proyecto frontend Next.js 14 (App Router) que ha sido extraído como repositorio independiente. Su código fuente proviene del monorepo GesFer (`src/Admin/Front/`) y su infraestructura IA (SddIA) del proyecto GesFer.Admin.Back (.NET/C#).

El proyecto arrastra **dos ejes de deuda técnica**:

1. **Acoplamiento con monorepo:** Alias `@shared/` apuntando fuera del repo, Dockerfile con rutas de monorepo, configs que incluyen paths externos.
2. **Herencia de backend .NET:** Tools, agentes, constituciones, workflows y scripts diseñados para un proyecto C#/.NET que no existe en este repo.

**Fuente de migración disponible:** `src/TmpMigration/Shared/Front/` (21 archivos, cobertura 100% de los `@shared/` usados).

**Restricción operativa confirmada:** En este repositorio, `src/` contiene el código funcional del frontend Admin, mientras que las implementaciones ejecutables usadas por SddIA deben mantenerse en `scripts/`. `SddIA/` conserva definición, contratos y documentación.

---

## 2. Alcance (Scope)

### 2.1 Dentro del alcance

| Área | Descripción |
|------|-------------|
| **SPEC-05: Agentes SddIA** | **Fase 1 (P0)** — Actualizar agentes con referencias a backend para que reflejen contexto frontend. |
| **SPEC-06: Constituciones y Manifesto** | **Fase 1 (P0)** — Actualizar referencias de GesFer.Admin.Back a GesFer.Admin.Front. |
| **SPEC-09: Documentación** | **Fase 1 (P0)** — Actualizar Objetivos.md, READMEs y docs que describen el backend. |
| **SPEC-04: Scripts** | **Fase 2 (P1)** — Limpiar/adaptar/eliminar scripts que apuntan a .NET o monorepo. |
| **SPEC-08: Tools SddIA** | **Fase 2 (P1)** — Marcar tools .NET como no aplicables; crear tools frontend equivalentes. |
| **SPEC-03: GitHub Workflow** | **Fase 2 (P1)** — Adaptar `pr-validation.yml` de .NET a Node.js/Next.js. |
| **SPEC-01: Internalización de Shared** | **Fase 3 (P2)** — Migrar componentes de TmpMigration a su ubicación definitiva en `src/`, eliminar alias `@shared/`, actualizar imports y configs. |
| **SPEC-02: Dockerfile** | **Fase 3 (P2)** — Reescribir para estructura standalone (sin monorepo). |
| **SPEC-07: Configuración URLs/Puertos** | **Fase 3 (P2)** — Unificar fallbacks de API y eliminar referencias a Product API. |

### 2.2 Fuera del alcance

- Desarrollo de nueva funcionalidad (features de negocio).
- Migración de backend o API.
- Upgrade de versiones de dependencias (Next.js 15, React 19, etc.).
- Refactorización de lógica de negocio existente.

---

## 3. Especificación por área

### SPEC-01 — Internalización de Shared

**Objetivo:** Eliminar la dependencia con la carpeta externa `../../Shared/Front/` y el alias `@shared/`, integrando los componentes necesarios directamente en `src/`.

#### 3.1.1 Componentes a migrar (de TmpMigration → src/)

**Componentes UI → `src/components/ui/`:**

| Componente | Acción | Justificación |
|------------|--------|---------------|
| `card.tsx` | **Copiar** (nuevo) | No existe localmente; usado en login y dashboard |
| `loading.tsx` | **Copiar** (nuevo) | No existe localmente; usado en dashboard y admin-app-wrapper |
| `button.tsx` | **Reemplazar** local | Shared superior: CVA, 6 variantes, `asChild`, `buttonVariants` |
| `input.tsx` | **Reemplazar** local | Unificar por consistencia (funcionalmente idénticos) |
| `label.tsx` | **Reemplazar** local | Unificar por consistencia (funcionalmente idénticos) |
| `error-message.tsx` | **Reemplazar** local | Shared superior: icono AlertCircle, className, data-testid |
| `dialog.tsx` | **Copiar** (nuevo) | Dependencia de shared/DestructiveActionConfirm y ModalBase |
| `alert-dialog.tsx` | **Copiar** (nuevo) | Disponible para uso futuro |
| `form.tsx` | **Copiar** (nuevo) | Útil para company-form; integración react-hook-form |
| `select.tsx` | **Copiar** (nuevo) | Disponible para uso futuro |
| `table.tsx` | **Copiar** (nuevo) | Dependencia de shared/DataTable |
| `overlay-fix.tsx` | **Copiar** (nuevo) | Disponible para uso futuro |

**Componentes Shared → `src/components/shared/`:**

| Componente | Acción | Justificación |
|------------|--------|---------------|
| `Button.tsx` | **Copiar** | Usado en Sidebar, admin-layout; wrapper con data-testid |
| `Button.spec.tsx` | **Copiar** | Tests del Button compartido |
| `DataTable.tsx` | **Copiar** | Tabla genérica reutilizable |
| `DestructiveActionConfirm.tsx` | **Copiar** | Vision Zero; patrón de seguridad del ecosistema |
| `Input.tsx` | **Copiar** | Wrapper con data-testid automático |
| `Input.spec.tsx` | **Copiar** | Tests del Input compartido |
| `ModalBase.tsx` | **Copiar** | Modal base reutilizable |

**Utilidades:**

| Archivo | Acción | Justificación |
|---------|--------|---------------|
| `lib/utils/cn.ts` | **Verificar/mantener** | Ya existe en `src/lib/utils/cn.ts`; verificar paridad |
| `lib/types/api.ts` | **Evaluar** | Tipos Country/City; copiar solo si relevantes para Admin |

#### 3.1.2 Adaptación de imports internos (componentes migrados)

Los componentes en TmpMigration usan rutas relativas internas (ej. `../../lib/utils/cn`). Tras migrar a `src/`, actualizar a alias `@/`:

| Import actual (TmpMigration) | Import destino (src/) |
|------------------------------|----------------------|
| `../../lib/utils/cn` | `@/lib/utils/cn` |
| `./button` (relativo dentro de ui/) | Mantener relativo o `@/components/ui/button` |
| `../ui/dialog` (desde shared/) | `@/components/ui/dialog` |
| `../ui/button` (desde shared/) | `@/components/ui/button` |
| `../ui/input` (desde shared/) | `@/components/ui/input` |
| `../ui/label` (desde shared/) | `@/components/ui/label` |

#### 3.1.3 Actualización de imports en archivos consumidores

| Archivo | Import actual | Import nuevo |
|---------|--------------|-------------|
| `src/app/login/page.tsx` | `@shared/components/ui/card` | `@/components/ui/card` |
| `src/app/login/page.tsx` | `@shared/components/ui/input` | `@/components/ui/input` |
| `src/app/login/page.tsx` | `@shared/components/ui/label` | `@/components/ui/label` |
| `src/app/login/page.tsx` | `@shared/components/ui/button` | `@/components/ui/button` |
| `src/app/login/page.tsx` | `@shared/components/ui/error-message` | `@/components/ui/error-message` |
| `src/app/dashboard/page.tsx` | `@shared/components/ui/card` | `@/components/ui/card` |
| `src/app/dashboard/page.tsx` | `@shared/components/ui/loading` | `@/components/ui/loading` |
| `src/app/dashboard/page.tsx` | `@shared/components/ui/error-message` | `@/components/ui/error-message` |
| `src/components/layout/Sidebar.tsx` | `@shared/components/shared/Button` | `@/components/shared/Button` |
| `src/components/layout/admin-layout.tsx` | `@shared/components/shared/Button` | `@/components/shared/Button` |
| `src/components/layout/admin-app-wrapper.tsx` | `@shared/components/ui/loading` | `@/components/ui/loading` |
| `src/__tests__/components/shared/Button.test.tsx` | `@shared/components/shared/Button` | `@/components/shared/Button` |

#### 3.1.4 Actualización de configuraciones

| Archivo | Cambio |
|---------|--------|
| `src/tsconfig.json` | Eliminar paths `@shared/*` y `@shared/types/*`. Eliminar `../../Shared/Front/**/*.ts(x)` de `include`. |
| `src/tailwind.config.ts` | Eliminar `../../Shared/Front/**/*` de `content`. |
| `src/jest.config.js` | Eliminar moduleNameMapper `@shared` → `../../Shared/Front/$1`. |

#### 3.1.5 Limpieza

- Eliminar `src/TmpMigration/` una vez verificado que todo compila y los tests pasan.

---

### SPEC-02 — Dockerfile

**Objetivo:** Reescribir el Dockerfile para que funcione con la estructura standalone del proyecto (sin monorepo).

**Estado actual:** Rutas `src/Admin/Front/` y `src/Shared/Front/` que no existen en el repo.

**Estado destino:**

- `WORKDIR /app`
- Copiar `package.json` y `package-lock.json` directamente
- `npm ci`
- Copiar `src/` (la app ya contiene todo lo necesario tras SPEC-01)
- `npm run build`
- Copiar standalone output
- Crear carpeta `public/` vacía si es necesario, o eliminar la línea `COPY --from=builder .../public`

**Criterio:** `docker build` exitoso sin dependencias externas.

---

### SPEC-03 — GitHub Workflow

**Objetivo:** Adaptar `.github/workflows/pr-validation.yml` para validar un proyecto Next.js en lugar de .NET.

**Cambios:**

| Actual | Destino |
|--------|---------|
| Setup .NET 8 | Setup Node.js 20 |
| `dotnet build` | `npm run build` |
| `dotnet test` | `npm run test` |
| Setup Rust + `verify_pr_protocol` | `npm run lint` + `npm run build` (o adaptar verify_pr_protocol) |

**Criterio:** PR validation pasa en un repo sin .NET SDK.

---

### SPEC-04 — Scripts

**Objetivo:** Limpiar scripts que apuntan a infraestructura .NET o monorepo.

| Script | Acción |
|--------|--------|
| `scripts/Run-E2ELocal.ps1` | Adaptar o eliminar (refs a .sln, .csproj) |
| `scripts/ejecutar-tests.ps1` | Adaptar a `npm run test` |
| `scripts/validate-services-and-health.ps1` | Adaptar (eliminar refs Product/Admin Back) |
| `scripts/install-front-dependencies.ps1` | Simplificar (solo Admin Front) |
| `scripts/cerrar-procesos-servicios.ps1` | Adaptar puertos al contexto actual |
| `scripts/run-service-with-log.ps1` | Adaptar ejemplos |
| `scripts/README-E2E.md` | Reescribir para contexto frontend |
| `scripts/tools/run-tests-local/` | Reescribir para npm/jest/playwright |
| `scripts/tools/start-api/` | Reescribir como `start-frontend` (npm run dev) |
| `scripts/tools/prepare-full-env/` | Simplificar o eliminar |
| `scripts/tools/invoke-mysql-seeds/` | Eliminar (no aplica) |
| `scripts/tools/postman-mcp-validation/` | Eliminar (no aplica) |
| `scripts/Propuesta/` | Evaluar relevancia |
| `scripts/skills/pr-skill.sh` | Adaptar: dotnet → npm |
| `scripts/skills/pr-skill.md` | Adaptar documentación/uso a frontend |
| `scripts/skills/commit-skill.sh` | Adaptar: dotnet → npm |

**Criterio:** Ningún script referencia a .sln, .csproj, dotnet, GesFer.Admin.Back, `../../Product/`, `../../Admin/`.

---

### SPEC-05 — Agentes SddIA

**Objetivo:** Actualizar agentes para que reflejen un proyecto frontend Next.js.

| Agente | Cambios |
|--------|---------|
| `tekton-developer.json` | Eliminar instrucciones C#; priorizar TypeScript/Next.js; reemplazar `dotnet-development` por `frontend-build` |
| `qa-judge.json` | Reemplazar `dotnet-development` y `dotnet test` por `npm test`, `npm run build`, `next lint` |
| `auditor/auditor.json` | Eliminar refs a DbContext, CS1998, Command Pattern backend; mantener WCAG, path mapping |
| `performance-engineer.json` | Reemplazar IAsyncLogPublisher y N+1 EF Core por Core Web Vitals, bundle size, lazy loading |
| `security-engineer.json` | Eliminar refs a ValueObjects, Seeds/MassLoad; actualizar a seguridad frontend (XSS, CSP, auth tokens); eliminar rutas absolutas |
| `architect.json` | Actualizar `allowed_paths` a estructura real del frontend |

**Criterio:** Ningún agente contiene referencias a C#, .NET, DbContext, dotnet, .sln, .csproj.

---

### SPEC-06 — Constituciones y Manifesto

**Objetivo:** Actualizar documentos constitucionales para que reflejen GesFer.Admin.Front.

| Documento | Cambio |
|-----------|--------|
| `SddIA/CONSTITUTION.md` | Título y contenido → GesFer.Admin.Front |
| `SddIA/constitution/constitution.architect.md` + `.json` | Ubicación → `src/` (Next.js, no .NET) |
| `SddIA/constitution/constitution.audity.md` + `.json` | Auditoría → SddIA frontend |
| `SddIA/constitution/constitution.cognitive.md` + `.json` | Persistencia → contexto frontend |
| `SddIA/constitution/constitution.duality.md` + `.json` | IPC → N/A (frontend web, no Electron) |
| `SddIA/manifesto.json` | Eliminar dependency_rules.backend; actualizar architecture_pillars a estructura frontend; eliminar seed_taxonomy |
| `SddIA/norms/pr-acceptance-protocol.md` | Reemplazar dotnet build/test por npm build/test |
| `SddIA/templates/spec-template.md` | Reemplazar "sistema GesFer" por contexto actual |

**Criterio:** Ningún documento constitucional contiene "GesFer.Admin.Back", "dotnet", ".sln" o rutas .NET.

---

### SPEC-07 — Configuración URLs/Puertos

**Objetivo:** Unificar los fallbacks de URL de API y eliminar inconsistencias.

| Archivo | Problema | Solución |
|---------|----------|---------|
| `src/auth.ts` | Fallback `http://localhost:5010` | Unificar a variable de entorno; sin fallback hardcoded o fallback consistente |
| `src/lib/api/admin-api.ts` | Fallback `http://localhost:5010` | Mismo criterio |
| `src/lib/api/admin-api-server.ts` | Fallback `http://localhost:5010` | Mismo criterio |
| `src/lib/config.ts` | Múltiples URLs hardcoded | Centralizar; un solo punto de configuración |
| `src/app/dashboard/page.tsx` | `localhost:5000` (API Product) | Reemplazar por API Admin o eliminar |
| `src/README.md` | Puerto `5001` incorrecto | Corregir documentación |

**Criterio:** Un único punto de definición de la URL de API. Sin referencias a puertos de Product (5000) ni inconsistencias HTTP/HTTPS.

---

### SPEC-08 — Tools SddIA

**Objetivo:** Adecuar el catálogo de tools al contexto frontend manteniendo la separación entre definición (`SddIA/tools/`) e implementación (`scripts/tools/`).

| Tool actual | Acción | Tool destino |
|-------------|--------|-------------|
| `start-api` | **Reescribir** | `start-frontend`: `npm run dev`, puerto 3001, health en localhost:3001 |
| `run-tests-local` | **Reescribir** | `run-tests-frontend`: `npm test`, `npm run test:e2e`, `npm run build` |
| `invoke-mysql-seeds` | **Eliminar** | N/A |
| `postman-mcp-validation` | **Eliminar** | N/A |
| `prepare-full-env` | **Simplificar** | `prepare-frontend-env`: solo npm install + verificación |

**Criterio:** Todas las tools ejecutables funcionan en el contexto del proyecto frontend.

---

### SPEC-09 — Documentación

**Objetivo:** Actualizar documentos que describen un proyecto distinto.

| Documento | Acción |
|-----------|--------|
| `Objetivos.md` (raíz) | Reescribir para GesFer.Admin.Front |
| `scripts/README-E2E.md` | Reescribir para contexto frontend |
| `SddIA/skills/invoke-command/spec.md` + `.json` | Cambiar contexto default de "GesFer" a "GesFer.Admin.Front" |
| `SddIA/skills/invoke-commit/spec.md` + `.json` | Cambiar contexto default |
| `SddIA/skills/pr-skill.md` | Adaptar a frontend |
| `SddIA/tools/*/spec.md` + `.json` | Actualizar según SPEC-08 |

**Criterio:** Toda documentación describe correctamente el proyecto GesFer.Admin.Front.

---

## 4. Seguridad

| Aspecto | Evaluación |
|---------|-----------|
| Exposición de secretos | Sin riesgo directo; `.env` en `.gitignore`. El `.env.example` expone credenciales de seeds (`admin/admin123`) — aceptable solo para desarrollo. |
| NextAuth | Versión beta (5.0-beta.30); monitorizar estabilidad. `AUTH_SECRET` pendiente de configurar en producción. |
| Vision Zero | Patrón DestructiveActionConfirm disponible en TmpMigration para internalizar (SPEC-01). |
| CSP / XSS | No evaluado en este spec; pendiente de auditoría frontend específica post-saneamiento. |

---

## 5. Criterios de aceptación globales

| ID | Criterio | Verificación |
|----|----------|-------------|
| **AC-01** | `npm run build` exitoso sin warnings de paths rotos | Ejecución local |
| **AC-02** | `npm run test` — todos los tests pasan | Ejecución local |
| **AC-03** | `npm run lint` sin errores | Ejecución local |
| **AC-04** | `docker build` exitoso (Dockerfile adaptado) | Ejecución local |
| **AC-05** | Cero referencias a `@shared/` en imports | Grep en src/ |
| **AC-06** | Cero referencias a `../../Shared/` en configs | Grep en src/ |
| **AC-07** | Cero referencias a `GesFer.Admin.Back`, `.sln`, `.csproj`, `dotnet` en SddIA y scripts | Grep en SddIA/ y scripts/ |
| **AC-08** | Cero referencias a `localhost:5000` (API Product) | Grep global |
| **AC-09** | `src/TmpMigration/` eliminada | Verificar ausencia |
| **AC-10** | GitHub workflow (`pr-validation.yml`) adaptado a Node.js | Revisión manual |

---

## 6. Dependencias entre SPECs

```
SPEC-01 (Shared) ──→ SPEC-02 (Dockerfile)
                 ──→ SPEC-07 (URLs)
                 ──→ AC-01..AC-03

SPEC-03 (Workflow) ←── SPEC-04 (Scripts)
                   ←── SPEC-08 (Tools)

SPEC-05 (Agentes)  ←── SPEC-06 (Constituciones)
                   ←── SPEC-09 (Docs)

SPEC-04 (Scripts)  ←── SPEC-08 (Tools)
```

**Orden de ejecución (actualizado tras clarify — CL-PRIO):**

> La IA debe operar con contexto correcto antes de asistir en cambios de código.

1. **Fase 1 (P0 — Contexto IA):** SPEC-05 → SPEC-06 → SPEC-09
2. **Fase 2 (P1 — CI/CD):** SPEC-04 → SPEC-08 → SPEC-03
3. **Fase 3 (P2 — Código fuente):** SPEC-01 → SPEC-02 → SPEC-07
