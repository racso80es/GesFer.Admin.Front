---
feature_id: kaizen-accessibility
type: feat
status: in_progress
---

# Spec: Kaizen Accesibilidad Input

## Requisitos
- La interfaz de `InputProps` en `src/components/shared/Input.tsx` deberá extenderse con `hasError?: boolean` y `errorMessageId?: string`.
- Cuando `hasError` se evalúe a verdadero, el input deberá renderizar explícitamente `aria-invalid="true"`.
- Cuando se provea un valor en `errorMessageId`, el input deberá renderizar explícitamente `aria-describedby={errorMessageId}`.
- Dichas propiedadas serán probadas en `Input.spec.tsx` usando `@testing-library/react`.