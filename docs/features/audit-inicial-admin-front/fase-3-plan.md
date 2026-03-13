# FASE 3 PLAN — Ejecución operativa

> **Acción:** planning (fase 3)  
> **Fecha:** 2026-03-12  
> **Feature:** `audit-inicial-admin-front`  
> **Dependencias previas:** Fase 1 y Fase 2 aplicadas en rama actual

---

## 1. Estrategia de ejecución

Orden obligatorio:

1. `F3-SPEC-01` (internalización + imports + config)
2. `F3-SPEC-02` (Dockerfile standalone)
3. `F3-SPEC-07` (URL/puertos)
4. Limpieza final y validación integral

---

## 2. Backlog de tareas fase 3

### TAREA F3-01 — Migrar UI desde TmpMigration

**Objetivo:** completar `src/components/ui/` con la base shared.

**Acciones:**

- Copiar nuevos: `card`, `loading`, `dialog`, `alert-dialog`, `form`, `select`, `table`, `overlay-fix`.
- Reemplazar: `button`, `input`, `label`, `error-message`.
- Normalizar imports internos a `@/`.

**Salida esperada:** `src/components/ui/` listo sin dependencias externas `@shared`.

### TAREA F3-02 — Migrar componentes shared

**Objetivo:** crear `src/components/shared/` operativo.

**Acciones:**

- Copiar: `Button`, `Button.spec`, `DataTable`, `DestructiveActionConfirm`, `Input`, `Input.spec`, `ModalBase`.
- Ajustar imports `../ui/*` a `@/components/ui/*`.

**Salida esperada:** carpeta shared local funcional y testeable.

### TAREA F3-03 — Actualizar consumidores

**Objetivo:** sustituir en código todos los imports `@shared`.

**Archivos objetivo:**

- `src/app/login/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/admin-layout.tsx`
- `src/components/layout/admin-app-wrapper.tsx`
- `src/__tests__/components/shared/Button.test.tsx`

**Salida esperada:** todos los imports apuntan a `@/`.

### TAREA F3-04 — Limpiar configuración

**Objetivo:** retirar acoplamiento de monorepo en tooling.

**Archivos objetivo:**

- `src/tsconfig.json`
- `src/tailwind.config.ts`
- `src/jest.config.js`

**Salida esperada:** sin alias ni includes de `../../Shared/Front`.

### TAREA F3-05 — Reescribir Dockerfile

**Objetivo:** contenedor compatible con repo standalone.

**Archivo objetivo:** `src/Dockerfile`

**Salida esperada:** build de imagen sin rutas `src/Admin/Front` o `src/Shared/Front`.

### TAREA F3-06 — Unificar API URL y puertos

**Objetivo:** coherencia de endpoints y fallback.

**Archivos objetivo:**

- `src/auth.ts`
- `src/lib/api/admin-api.ts`
- `src/lib/api/admin-api-server.ts`
- `src/app/dashboard/page.tsx`
- `src/lib/config.ts`
- `src/README.md`

**Salida esperada:** referencia canónica `https://localhost:5011`, sin `localhost:5000`.

### TAREA F3-07 — Limpieza y cierre

**Objetivo:** cerrar fase sin deuda técnica residual de migración.

**Acciones:**

- Ejecutar `npm run lint`
- Ejecutar `npm run build`
- Ejecutar `npm run test`
- Eliminar `src/TmpMigration/`
- Ejecutar `npm run build` final

---

## 3. Checklist de verificación

- [ ] No existen imports `@shared/` en `src/`.
- [ ] No existen rutas `../../Shared/` en `src/`.
- [ ] No existen referencias `localhost:5000`.
- [ ] Lint/build/test en verde.
- [ ] Dockerfile actualizado a estructura standalone.
- [ ] `src/TmpMigration/` eliminado.

---

## 4. Estimación relativa

- F3-01 + F3-02: Alta (mayor volumen de archivos)
- F3-03 + F3-04: Media
- F3-05: Media
- F3-06: Media
- F3-07: Baja

Ruta crítica: **F3-01 → F3-03 → F3-04 → F3-07**.

