# FASE 3 CLARIFY — Decisiones y consultas

> **Acción:** clarify (fase 3)  
> **Fecha:** 2026-03-12  
> **Feature:** `audit-inicial-admin-front`

---

## 1. Clarificaciones cerradas para ejecución

### CL-F3-01 — `cn.ts`

- **Situación:** existe en `src/lib/utils/cn.ts` y en `TmpMigration`.
- **Verificación:** ambos archivos son idénticos.
- **Decisión:** mantener `src/lib/utils/cn.ts` sin cambios.

### CL-F3-02 — `@shared` en configuración

- **Situación:** alias y referencias externas activas en TypeScript, Tailwind y Jest.
- **Decisión:** eliminar completamente `@shared/*` y rutas `../../Shared/Front/*` en configs como parte de F3-SPEC-01.

### CL-F3-03 — URL canónica de API en desarrollo

- **Situación:** `.env.example` establece `ADMIN_API_URL=https://localhost:5011`.
- **Decisión:** usar `https://localhost:5011` como referencia canónica; retirar `http://localhost:5010` de fallbacks.

### CL-F3-04 — Product API en dashboard

- **Situación:** hay llamada a `http://localhost:5000`.
- **Decisión base:** eliminar referencia a Product API y usar endpoint Admin equivalente o fallback seguro.

---

## 2. Consultas al usuario (si desea definir comportamiento exacto)

Estas consultas **no bloquean** iniciar la fase; se puede proceder con valores por defecto.

1. **Dashboard y endpoint de datos**
   - ¿Deseas que `src/app/dashboard/page.tsx` apunte a un endpoint Admin concreto (indicar ruta), o dejamos temporalmente un placeholder seguro hasta que el endpoint esté disponible?
   - **Default propuesto si no hay respuesta:** placeholder seguro sin dependencia a Product API.

2. **`lib/types/api.ts` (Country/City)**
   - ¿Quieres copiar estos tipos desde `TmpMigration` a `src/lib/types/api.ts` ahora?
   - **Default propuesto si no hay respuesta:** no copiar en Fase 3 (aplicar solo si aparece uso real).

---

## 3. Política de resolución por defecto

Si no hay respuesta del usuario antes de ejecutar:

- Aplicar defaults propuestos en las dos consultas.
- Registrar en el cierre de Fase 3 que se usaron defaults operativos.

