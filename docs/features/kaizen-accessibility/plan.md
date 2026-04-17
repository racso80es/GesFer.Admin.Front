---
feature_id: kaizen-accessibility
type: feat
status: planning
---

# Plan: Kaizen Accesibilidad Input

1. Modificar `InputProps` en `src/components/shared/Input.tsx` para aceptar `hasError?: boolean` y `errorMessageId?: string`.
2. Actualizar el renderizado del `ShadcnInput` pasándole estas propiedades en caso de ser provistas.
3. Modificar `src/components/shared/Input.spec.tsx` para probar las nuevas propiedades.