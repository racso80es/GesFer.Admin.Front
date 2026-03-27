---
title: Especificación de Corrección de Auditoría 2026-03-20
description: Especificación técnica para solucionar los hallazgos de type safety y feedback en formularios según auditoría.
---

# Especificación

Esta especificación detalla las correcciones a realizar de acuerdo con la auditoría `AUDITORIA_2026_03_20.md`.

## 1. Type Safety en Catch Blocks
El compilador de TypeScript asume por defecto que las variables en un bloque catch son de tipo `unknown`. Pasarlas directamente a `console.error` u otra función es inseguro porque podrían no contener el `message` esperado, o no ser un objeto.
Se implementará un type guard:
```typescript
const message = error instanceof Error ? error.message : String(error);
```

### Rutas afectadas:
- `src/app/api/companies/[id]/route.ts`: En GET, PUT y DELETE.
- `src/app/api/companies/route.ts`: En POST.

## 2. Feedbacks Visuales por Errores
Se añadirá un estado de React `errorMsg` en las páginas de edición y creación de organizaciones.

### Rutas afectadas:
- `src/app/companies/new/page.tsx`
- `src/app/companies/[id]/edit/page.tsx`

Se añadirá:
```tsx
const [errorMsg, setErrorMsg] = useState<string | null>(null);
```
En los correspondientes `handleSubmit`, el `catch` seteará este mensaje, y se renderizará como un elemento visual, removiendo todos los comentarios de "todo" asociados a mostrar mensajes.