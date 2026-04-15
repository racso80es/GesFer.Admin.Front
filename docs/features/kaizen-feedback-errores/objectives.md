# Objetivos de la Tarea: Kaizen - Feedback de Errores

## Propósito General
Implementar un sistema de feedback visible para el usuario final cuando ocurre un error al intentar crear o editar una organización, en lugar de limitarse a usar `console.error()`. Esto aborda directamente el hallazgo H-03 identificado en la auditoría `AUDITORIA_FUNCIONAL_FRONTEND_2026-03-13.md`.

## Objetivos Específicos
1. Modificar el componente en `src/app/companies/new/page.tsx` para capturar cualquier error lanzado en el bloque `catch` de la función `handleSubmit`.
2. Mostrar un mensaje de error claro y visualmente diferenciado (usando los estilos de error existentes en el proyecto) en caso de que la API retorne error al crear una nueva organización.
3. Modificar el componente en `src/app/companies/[id]/edit/page.tsx` para aplicar exactamente el mismo comportamiento (captura y visualización) en el proceso de actualización de una organización existente.

## Criterios de Éxito (DoD)
- Ambos formularios (`new` y `edit`) pueden mostrar un mensaje de error en pantalla si el fetch a la API falla.
- El proyecto compila correctamente (`npm run build`).
- Los tests existentes pasan (`npm run test`).
- El logueo original (`console.error`) puede mantenerse para depuración, pero no debe ser la única fuente de información de error.
