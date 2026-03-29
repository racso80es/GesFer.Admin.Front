# Objectives

- Refactorizar el manejo de errores en los endpoints de la API (`src/app/api/...`) para extraer el mensaje del error utilizando type guards de TypeScript (`error instanceof Error`).
- Evitar pasar el objeto de error crudo (`unknown`) directamente a `console.error` o a las respuestas JSON.
- Cumplir con la acción Kaizen identificada en la auditoría `AUDITORIA_2026_03_23.md`.
