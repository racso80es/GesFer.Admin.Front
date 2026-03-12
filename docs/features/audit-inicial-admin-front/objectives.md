. # Auditoría Inicial — GesFer.Admin.Front

> **Proceso:** feature (audit-inicial-admin-front)  
> **Fecha:** 2026-03-12  
> **Rol activo:** Auditor  
> **Estado:** Fase de spec (especificación completada)

---

## 1. Contexto

El proyecto **GesFer.Admin.Front** se ha creado como repositorio independiente a partir de:

- **Código fuente (`src/`):** Copiado de la carpeta `src/Admin/Front/` del monorepo **GesFer**, donde convivía acoplado con el back Admin y el Product (front y back).
- **Infraestructura IA (`SddIA/`, `scripts/`, `AGENTS.md`):** Copiada del proyecto **GesFer.Admin.Back**, que es un backend .NET/C#.

El resultado es un proyecto frontend Next.js que arrastra herencia de dos contextos distintos: el monorepo GesFer (acoplamiento de carpetas compartidas) y el proyecto backend Admin (infraestructura SddIA orientada a .NET).

- **Contenido Shared (`src/TmpMigration/Shared/Front/`):** Se ha copiado el contenido de la carpeta compartida original para disponer de él como fuente de migración. Esta carpeta es **temporal**: deberá eliminarse una vez que el proceso de adaptación haya internalizado o descartado cada componente.

---

## 2. Objetivo general

Realizar un **análisis/auditoría en profundidad** de la situación actual del proyecto para disponer de un conocimiento completo que permita, en acciones futuras, **sanear, adecuar y adaptar** la solución a su nueva realidad como repositorio frontend independiente.

---

## 3. Objetivos específicos

### OBJ-01 — Inventario de acoplamiento con monorepo GesFer

Identificar todas las dependencias, referencias y configuraciones que asumen la existencia del monorepo original (`../../Shared/Front/`, `../../Product/`, `src/Admin/Front/`).

**Hallazgos principales:**

| Categoría | Cantidad | Severidad |
|-----------|----------|-----------|
| Importaciones `@shared/` que apuntan a `../../Shared/Front/` | 6 archivos + 3 configs (tsconfig, jest, tailwind) | **Crítica** |
| Dockerfile con rutas de monorepo (`src/Admin/Front/`, `src/Shared/Front/`) | 1 archivo, múltiples líneas | **Crítica** |
| Scripts con rutas Product/Admin/Shared del monorepo | 5+ archivos | **Alta** |

**Archivos afectados (src):**

- `src/tsconfig.json` → paths `@shared/*` → `../../Shared/Front/*`; include `../../Shared/Front/**/*.ts(x)`
- `src/tailwind.config.ts` → content incluye `../../Shared/Front/**/*`
- `src/jest.config.js` → moduleNameMapper `@shared` → `../../Shared/Front/$1`
- `src/Dockerfile` → `COPY src/Admin/Front/`, `COPY src/Shared/Front/`
- `src/app/login/page.tsx`, `src/app/dashboard/page.tsx`, `src/components/layout/Sidebar.tsx`, `src/components/layout/admin-layout.tsx`, `src/components/layout/admin-app-wrapper.tsx`, `src/__tests__/components/shared/Button.test.tsx` → importaciones `@shared/`

---

### OBJ-02 — Inventario de acoplamiento con GesFer.Admin.Back

Identificar todas las referencias a infraestructura, herramientas, scripts y configuraciones del proyecto backend .NET que no aplican al frontend.

**Hallazgos principales:**

| Categoría | Cantidad | Severidad |
|-----------|----------|-----------|
| Scripts con rutas `GesFer.Admin.Back.*` (.sln, .csproj, dotnet) | 10+ archivos | **Alta** |
| Tools SddIA diseñadas para backend .NET | 5 herramientas completas | **Alta** |
| Agentes SddIA con referencias a C#/DbContext/EF | 5 agentes | **Media** |
| Constituciones SddIA referenciando GesFer.Admin.Back | 4 constituciones (.md + .json) | **Media** |
| GitHub workflow con .NET SDK y dotnet build/test | 1 workflow | **Alta** |

**Tools no aplicables al frontend:**

| Tool | Razón |
|------|-------|
| `start-api` | Ejecuta `dotnet run` en `GesFer.Admin.Back.Api` |
| `run-tests-local` | Ejecuta `dotnet test` contra solución .NET |
| `invoke-mysql-seeds` | Migraciones Entity Framework y seeds MySQL |
| `postman-mcp-validation` | Newman contra API .NET localhost:5010 |
| `prepare-full-env` | Docker + API .NET + MySQL |

**Agentes con herencia backend:**

| Agente | Referencias inadecuadas |
|--------|------------------------|
| `tekton-developer` | Instrucciones C#, dotnet build, skill dotnet-development |
| `qa-judge` | Skill dotnet-development, dotnet test |
| `auditor` | Backend C#, DbContext, CS1998, Command Pattern |
| `performance-engineer` | IAsyncLogPublisher, N+1 EF Core |
| `security-engineer` | ValueObjects, Seeds/MassLoad, rutas absolutas GesFer |

---

### OBJ-03 — Inconsistencias de configuración

Identificar configuraciones contradictorias o desactualizadas.

**Hallazgos:**

| Problema | Ubicación | Detalle |
|----------|-----------|---------|
| Puertos inconsistentes | `src/README.md` vs código | README dice `5001`, código usa `5010`/`5011` |
| API Product en dashboard | `src/app/dashboard/page.tsx` | Referencia `localhost:5000` (API Product, no Admin) |
| Fallback HTTP vs HTTPS | `auth.ts`, `admin-api.ts`, `admin-api-server.ts` | Fallback a `http://localhost:5010`; config.ts usa `https://localhost:5011` |
| Carpeta `public/` ausente | `src/Dockerfile` | Dockerfile intenta copiar `public/` pero no existe |
| Script bash en Windows | `src/tests/run-e2e-mock.sh` | Script bash; proyecto define entorno PowerShell |

---

### OBJ-04 — Estado de la infraestructura SddIA

Evaluar qué componentes de SddIA son válidos, cuáles requieren adaptación y cuáles deben eliminarse.

**Clasificación:**

| Estado | Componentes |
|--------|-------------|
| **Válidos sin cambios** | Skills genéricas (iniciar-rama, finalizar-git, invoke-command, invoke-commit), agentes genéricos (frontend-architect, cumulo, infrastructure-architect, clarifier), constitution.json (leyes universales), validate-nomenclatura.ps1 |
| **Requieren adaptación** | pr-skill.sh, commit-skill.sh, verify_pr_protocol (Rust), .github/pr-validation.yml, agentes (tekton, qa-judge, auditor, performance, security), manifesto.json, CONSTITUTION.md, constituciones |
| **No aplicables** | invoke-mysql-seeds, postman-mcp-validation, prepare-full-env, start-api (como tool .NET), run-tests-local (como tool .NET) |

---

### OBJ-05 — Dependencias del proyecto compartido (Shared) y TmpMigration

Determinar qué componentes de `@shared/` se utilizan, cruzar con el contenido copiado en `TmpMigration`, y definir la estrategia de internalización.

**Fuente de migración:** `src/TmpMigration/Shared/Front/` (carpeta temporal, eliminar tras migración).

#### 5.1 Inventario completo de TmpMigration/Shared/Front (21 archivos)

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `components/ui/alert-dialog.tsx` | UI | AlertDialog sobre Dialog (8 exports) |
| `components/ui/button.tsx` | UI | Button con CVA (6 variantes, 4 tamaños, `asChild`) + `buttonVariants` |
| `components/ui/card.tsx` | UI | Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent |
| `components/ui/dialog.tsx` | UI | Dialog modal con overlay, timeout seguridad, botón cerrar |
| `components/ui/error-message.tsx` | UI | ErrorMessage con icono AlertCircle, className, data-testid |
| `components/ui/form.tsx` | UI | Integración react-hook-form (Form, FormField, FormItem, FormLabel, FormControl, FormMessage) |
| `components/ui/input.tsx` | UI | Input con forwardRef |
| `components/ui/label.tsx` | UI | Label con forwardRef |
| `components/ui/loading.tsx` | UI | Spinner con Loader2, tamaños sm/md/lg, texto opcional |
| `components/ui/overlay-fix.tsx` | UI | Componente sin UI que corrige overlays bloqueantes |
| `components/ui/select.tsx` | UI | Select con contexto React, controlado/no controlado |
| `components/ui/table.tsx` | UI | Table, TableHeader, TableBody, TableRow, TableHead, TableCell |
| `components/shared/Button.tsx` | Shared | Wrapper de ui/button con data-testid automático |
| `components/shared/Button.spec.tsx` | Test | Tests del Button compartido |
| `components/shared/DataTable.tsx` | Shared | Tabla genérica con columnas, loading, paginación, filas expandibles |
| `components/shared/DestructiveActionConfirm.tsx` | Shared | Diálogo Vision Zero (requiere escribir keyword para confirmar) |
| `components/shared/Input.tsx` | Shared | Wrapper de ui/input con data-testid automático |
| `components/shared/Input.spec.tsx` | Test | Tests del Input compartido |
| `components/shared/ModalBase.tsx` | Shared | Modal base con header, footer, botones confirmar/cancelar |
| `lib/types/api.ts` | Tipos | Country, City (tipos de API) |
| `lib/utils/cn.ts` | Util | Combina clases CSS (clsx + twMerge) |

#### 5.2 Componentes `@shared/` actualmente importados en src/

| Componente `@shared/` | Usado en | Existe en TmpMigration |
|------------------------|----------|------------------------|
| `components/ui/card` | login, dashboard | **Sí** |
| `components/ui/input` | login | **Sí** |
| `components/ui/label` | login | **Sí** |
| `components/ui/button` | login | **Sí** |
| `components/ui/error-message` | login, dashboard | **Sí** |
| `components/ui/loading` | dashboard, admin-app-wrapper | **Sí** |
| `components/shared/Button` | Sidebar, admin-layout, test Button | **Sí** |

**Cobertura: 100%** — Todos los componentes `@shared/` importados están disponibles en TmpMigration.

#### 5.3 Análisis de duplicados locales vs TmpMigration (Shared)

Existen 4 archivos en `src/components/ui/` que duplican parcialmente componentes de Shared:

| Componente | Local (`src/components/ui/`) | Shared (`TmpMigration`) | Diferencias | Recomendación |
|------------|----------------------------|-------------------------|-------------|---------------|
| **button.tsx** | Versión simplificada: 4 variantes, sin CVA, sin `asChild`, sin `buttonVariants` | Versión completa: CVA, 6 variantes (+ secondary, link), `asChild`, exporta `buttonVariants` | **Shared es superior** | Reemplazar local con Shared |
| **input.tsx** | forwardRef, estilos base | forwardRef, mismos estilos base | **Funcionalmente idénticos** | Mantener uno (preferir Shared por consistencia) |
| **label.tsx** | forwardRef, estilos base | forwardRef, mismos estilos base | **Funcionalmente idénticos** | Mantener uno (preferir Shared por consistencia) |
| **error-message.tsx** | Versión mínima: sin icono, sin className, sin data-testid | Versión completa: icono AlertCircle, className, data-testid | **Shared es superior** | Reemplazar local con Shared |

#### 5.4 Componentes adicionales disponibles en TmpMigration (no usados aún)

Estos componentes no se importan actualmente pero están disponibles para uso futuro:

| Componente | Utilidad potencial |
|------------|-------------------|
| `ui/dialog` | Modales (usado internamente por DestructiveActionConfirm y ModalBase) |
| `ui/alert-dialog` | Alertas sobre Dialog |
| `ui/form` | Integración react-hook-form (útil para company-form y otros formularios) |
| `ui/select` | Selects con contexto React |
| `ui/table` | Tablas (usado internamente por DataTable) |
| `ui/overlay-fix` | Fix de overlays bloqueantes |
| `shared/DataTable` | Tabla genérica con paginación y filas expandibles |
| `shared/DestructiveActionConfirm` | Diálogo Vision Zero para acciones destructivas |
| `shared/Input` | Wrapper con data-testid automático |
| `shared/ModalBase` | Modal base reutilizable |
| `lib/types/api.ts` | Tipos Country, City (evaluar relevancia para Admin) |

#### 5.5 Dependencias externas de componentes Shared

Todos los componentes de TmpMigration dependen de paquetes **ya instalados** en `src/package.json`:

| Dependencia | Usada por | Estado |
|-------------|-----------|--------|
| `class-variance-authority` | button.tsx (CVA) | **Instalada** |
| `clsx` | cn.ts | **Instalada** |
| `tailwind-merge` | cn.ts | **Instalada** |
| `lucide-react` | dialog, error-message, loading | **Instalada** |
| `react-hook-form` | form.tsx | **Instalada** |

#### 5.6 Estrategia de internalización propuesta

1. **Mover** componentes de `TmpMigration/Shared/Front/components/ui/` a `src/components/ui/` (reemplazando los duplicados locales inferiores).
2. **Mover** componentes de `TmpMigration/Shared/Front/components/shared/` a `src/components/shared/`.
3. **Mover** `TmpMigration/Shared/Front/lib/utils/cn.ts` — verificar si ya existe en `src/lib/utils/cn.ts` (existe; comparar).
4. **Evaluar** `TmpMigration/Shared/Front/lib/types/api.ts` — tipos Country/City pueden no ser relevantes para Admin.
5. **Actualizar** imports de `@shared/` a `@/` en los 6 archivos afectados.
6. **Actualizar** configs: tsconfig.json (eliminar paths y includes de `../../Shared/`), jest.config.js, tailwind.config.ts.
7. **Eliminar** `src/TmpMigration/` una vez completada la migración.

---

### OBJ-06 — Documentación de referencia desactualizada

Identificar documentos que describen el proyecto backend en lugar del frontend.

| Documento | Problema |
|-----------|----------|
| `Objetivos.md` (raíz) | Título y contenido describen GesFer.Admin.Back |
| `SddIA/CONSTITUTION.md` | Título: "Constitución del Proyecto (GesFer.Admin.Back)" |
| `SddIA/constitution/constitution.architect.md` | Referencia a "src/ (proyectos .NET)" |
| `SddIA/constitution/constitution.*.md` y `.json` | Todas referencian GesFer.Admin.Back |
| `SddIA/norms/pr-acceptance-protocol.md` | Pasos: dotnet build, dotnet test |
| `scripts/README-E2E.md` | Referencia a GesFer.Admin.Back y rutas absolutas |

---

## 4. Stack tecnológico actual

| Aspecto | Tecnología / Versión |
|---------|---------------------|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript 5.3 |
| UI | Tailwind CSS 3.4, Lucide React |
| Estado servidor | TanStack React Query 5.28 |
| Formularios | react-hook-form 7.53 + Zod 4.3 |
| Autenticación | NextAuth 5.0 beta (CredentialsProvider) |
| Internacionalización | next-intl 4.8 |
| Testing | Jest 29 + Testing Library + Playwright 1.57 |
| Logging | Pino 10.1 |
| Puerto desarrollo | 3001 |

---

## 5. Próximos pasos (acciones futuras)

Estos objetivos definirán las acciones de saneamiento y adaptación en fases posteriores:

| Prioridad | Fase | Acción propuesta | Justificación |
|-----------|------|-----------------|---------------|
| **P0 — Crítica** | Fase 1 | Actualizar agentes SddIA | La IA debe operar con contexto frontend, no backend |
| **P0 — Crítica** | Fase 1 | Actualizar constituciones y manifesto | Referencian GesFer.Admin.Back; contaminan contexto IA |
| **P0 — Crítica** | Fase 1 | Actualizar documentación (Objetivos.md, READMEs, skills) | Describen el backend; la IA los lee como SSOT |
| **P1 — Alta** | Fase 2 | Limpiar/adaptar scripts backend | 10+ scripts apuntan a .NET |
| **P1 — Alta** | Fase 2 | Crear/adaptar tools SddIA para frontend | start-frontend, run-tests-frontend |
| **P1 — Alta** | Fase 2 | Adaptar GitHub workflow (`pr-validation.yml`) | Bloquea PRs con pasos .NET inexistentes |
| **P2 — Media** | Fase 3 | Internalizar componentes `@shared/` desde `TmpMigration` | Fuente disponible; cobertura 100%; 4 locales inferiores a reemplazar |
| **P2 — Media** | Fase 3 | Adaptar Dockerfile | Rutas de monorepo impiden build de contenedor |
| **P2 — Media** | Fase 3 | Unificar configuración de URLs/puertos | Inconsistencias 5000/5010/5011/5001 |
