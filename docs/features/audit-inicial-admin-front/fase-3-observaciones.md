# FASE 3 — Observaciones de contexto operativo

> **Acción:** observaciones (contexto de ejecución)  
> **Fecha:** 2026-03-12  
> **Feature:** `audit-inicial-admin-front`  
> **Fase objetivo:** Fase 3 (P2) — `SPEC-01`, `SPEC-02`, `SPEC-07`

---

## 1. Estado actual verificado en código

### 1.1 Dependencia `@shared/` aún activa (pendiente de internalización)

Se mantienen importaciones `@shared/` en:

- `src/app/login/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/admin-layout.tsx`
- `src/components/layout/admin-app-wrapper.tsx`
- `src/__tests__/components/shared/Button.test.tsx`

Y configuración asociada en:

- `src/tsconfig.json`
- `src/tailwind.config.ts`
- `src/jest.config.js`
- `src/README.md` (documenta alias heredado)

### 1.2 Fuente de migración disponible y completa

`src/TmpMigration/Shared/Front/` contiene 21 archivos, incluyendo todos los componentes actualmente consumidos por `@shared/` y componentes adicionales reutilizables.

### 1.3 Estado de componentes locales

- `src/components/ui/` contiene solo 4 archivos actuales: `button.tsx`, `input.tsx`, `label.tsx`, `error-message.tsx`.
- `src/components/shared/` no existe aún en estado funcional.
- `src/lib/utils/cn.ts` y `src/TmpMigration/Shared/Front/lib/utils/cn.ts` son idénticos (no requiere reemplazo).

### 1.4 Dockerfile aún acoplado a monorepo

`src/Dockerfile` mantiene rutas `src/Admin/Front` y `src/Shared/Front`, incompatibles con este repositorio standalone.

### 1.5 Configuración de URL/puertos inconsistente

- Persisten fallbacks a `http://localhost:5010` en:
  - `src/auth.ts`
  - `src/lib/api/admin-api.ts`
  - `src/lib/api/admin-api-server.ts`
- Hay referencia a `http://localhost:5000` (Product API) en `src/app/dashboard/page.tsx`.
- `src/.env.example` define canónico de desarrollo: `https://localhost:5011`.

---

## 2. Riesgos y bloqueos potenciales

## 2.1 Riesgos de implementación

- **Riesgo de ruptura visual/funcional** al reemplazar `button.tsx` y `error-message.tsx` por variantes más completas.
- **Riesgo de imports internos rotos** en componentes migrados si no se normaliza a alias `@/`.
- **Riesgo de fallos de test** por cambio de rutas y por incorporación de nuevos componentes compartidos.

## 2.2 Riesgos de entorno

- `src/tests/run-e2e-mock.sh` usa `ADMIN_API_URL=http://localhost:5050`; no bloquea Fase 3 pero puede generar confusión de puertos en validaciones manuales.
- El Dockerfile actual no es construible en su forma esperada mientras exista acoplamiento a rutas de monorepo.

---

## 3. Recomendación operativa para ejecución

1. Ejecutar Fase 3 en orden: `SPEC-01` → `SPEC-02` → `SPEC-07`.
2. Validar compilación/lint/tests después de completar `SPEC-01` antes de tocar Docker.
3. En `SPEC-07`, priorizar convergencia en `https://localhost:5011` y eliminar `localhost:5000`.
4. Eliminar `src/TmpMigration/` solo al final, con build final exitoso.

---

## 4. Preparado para iniciar Fase 3

Estado: **listo para ejecución**, con dos aclaraciones funcionales no bloqueantes para confirmar (ver `fase-3-clarify.md`).

