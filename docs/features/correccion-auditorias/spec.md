---
title: Corrección Auditoría Catch TypeError
date: 2026-03-27
author: Guardián de la Infraestructura
status: Draft
---

# Spec.md: Aplicación Corrección Auditoría

El Executor deberá iterar en los ficheros identificados (`page.tsx`, `company-form.tsx`, `DestructiveActionConfirm.tsx`, etc.) y aplicar este patrón:

```typescript
try {
  // ...
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Mensaje de error:", message); // O usar el message en el UI setError
}
```

**Scope de Ficheros**:
- `src/app/dashboard/page.tsx`
- `src/app/login/page.tsx`
- `src/app/companies/page.tsx`
- `src/app/companies/new/page.tsx`
- `src/app/companies/[id]/edit/page.tsx`
- `src/components/shared/DestructiveActionConfirm.tsx`
- `src/components/companies/company-form.tsx`
- `src/lib/api/admin-api-server.ts`
- `src/lib/config.ts`
- `src/components/ui/overlay-fix.tsx`
