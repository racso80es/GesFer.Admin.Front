# FASE 3 SPEC — Internalización Shared, Dockerfile y URLs

> **Acción:** spec (fase 3)  
> **Fecha:** 2026-03-12  
> **Feature:** `audit-inicial-admin-front`  
> **Base:** `spec.md`, `clarify.md`, `plan.md` + estado real de código en rama actual

---

## 1. Objetivo de fase

Completar la adaptación del código fuente para que `GesFer.Admin.Front` quede desacoplado de `@shared/` y de rutas de monorepo, con configuración de API coherente y Dockerfile standalone funcional.

---

## 2. Alcance de la fase

## 2.1 En alcance

- **F3-SPEC-01 (Internalización Shared):**
  - Migrar componentes desde `src/TmpMigration/Shared/Front/` hacia `src/components/ui/` y `src/components/shared/`.
  - Sustituir imports `@shared/*` por `@/*`.
  - Actualizar `src/tsconfig.json`, `src/tailwind.config.ts`, `src/jest.config.js`.
  - Eliminar `src/TmpMigration/` al cierre.

- **F3-SPEC-02 (Dockerfile):**
  - Reescribir `src/Dockerfile` para estructura standalone del repo.

- **F3-SPEC-07 (URLs/Puertos):**
  - Unificar fallbacks/API base en `https://localhost:5011` para desarrollo.
  - Eliminar referencia a Product API (`localhost:5000`) en dashboard.

## 2.2 Fuera de alcance

- Nuevas funcionalidades de negocio.
- Reescritura arquitectónica de capa API o auth.
- Cambios de versión de framework/dependencias.

---

## 3. Especificación detallada

### 3.1 F3-SPEC-01 — Internalización Shared

#### 3.1.1 Migración de UI

**Destino:** `src/components/ui/`

- Copiar como nuevos: `card.tsx`, `loading.tsx`, `dialog.tsx`, `alert-dialog.tsx`, `form.tsx`, `select.tsx`, `table.tsx`, `overlay-fix.tsx`.
- Reemplazar locales: `button.tsx`, `input.tsx`, `label.tsx`, `error-message.tsx`.

#### 3.1.2 Migración de shared

**Destino:** `src/components/shared/`

- Copiar: `Button.tsx`, `Button.spec.tsx`, `DataTable.tsx`, `DestructiveActionConfirm.tsx`, `Input.tsx`, `Input.spec.tsx`, `ModalBase.tsx`.

#### 3.1.3 Reglas de imports internos

- `../../lib/utils/cn` → `@/lib/utils/cn`
- `../ui/dialog` → `@/components/ui/dialog`
- `../ui/button` → `@/components/ui/button`
- `../ui/input` → `@/components/ui/input`
- `../ui/label` → `@/components/ui/label`

#### 3.1.4 Consumidores a actualizar

- `src/app/login/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/admin-layout.tsx`
- `src/components/layout/admin-app-wrapper.tsx`
- `src/__tests__/components/shared/Button.test.tsx`

#### 3.1.5 Configuración a actualizar

- `src/tsconfig.json`: eliminar alias e includes de `../../Shared/Front`.
- `src/tailwind.config.ts`: eliminar contenido `../../Shared/Front/**/*`.
- `src/jest.config.js`: eliminar mapper `^@shared/(.*)$`.

#### 3.1.6 Utilidades

- `src/lib/utils/cn.ts`: mantener archivo actual (paridad total con TmpMigration).
- `src/lib/types/api.ts`: agregar solo si su uso queda justificado en Admin.

### 3.2 F3-SPEC-02 — Dockerfile standalone

`src/Dockerfile` debe:

- Trabajar sobre `/app` con paquete de `src/`.
- Instalar dependencias desde `src/package*.json`.
- Construir Next en contexto standalone del frontend.
- Eliminar acoplamientos a `src/Admin/Front/` y `src/Shared/Front/`.
- No copiar `public/` si no existe.

### 3.3 F3-SPEC-07 — Unificación URLs/Puertos

- Reemplazar fallbacks `http://localhost:5010` por criterio canónico dev `https://localhost:5011` en:
  - `src/auth.ts`
  - `src/lib/api/admin-api.ts`
  - `src/lib/api/admin-api-server.ts`
- Eliminar `http://localhost:5000` en `src/app/dashboard/page.tsx`.
- Alinear documentación en `src/README.md`.
- Mantener consistencia con `src/.env.example`.

---

## 4. Criterios de aceptación de fase

- `npm run lint` sin errores.
- `npm run build` exitoso.
- `npm run test` exitoso.
- Cero referencias a `@shared/` en `src/`.
- Cero referencias a `../../Shared/` en `src/`.
- Cero referencias a `localhost:5000` en `src/`.
- `src/TmpMigration/` eliminado.
- `docker build` exitoso (si Docker disponible en entorno local).

