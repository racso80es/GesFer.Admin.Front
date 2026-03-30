# Objetivos: Kaizen Error Handling (Remaining)

## Propósito
Completar la acción Kaizen definida en la auditoría `AUDITORIA_2026_03_23.md` referente a la estandarización del manejo de errores en los endpoints de la API, específicamente en el archivo que quedó pendiente en la iteración anterior.

## Objetivos Específicos
1. Modificar el archivo `src/app/api/companies/[id]/route.ts`.
2. Aplicar un type guard (`error instanceof Error`) en todos los bloques `catch` (GET, PUT, DELETE) para extraer de forma segura el mensaje de error.
3. Asegurar que el objeto `error` (o tipo `unknown`) no se pase directamente a `console.error()`, cumpliendo con la directiva estricta de código del proyecto y previniendo la exposición de trazas completas de error o problemas de serialización en los logs.
4. Validar que el proyecto compila y los tests pasan sin problemas después de los cambios.
