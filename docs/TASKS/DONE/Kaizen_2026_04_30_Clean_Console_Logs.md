# Tarea: Kaizen Limpieza de console.error no sanitizados

## Análisis
En revisiones de código y auditorías pasadas, se hizo hincapié en que `console.error` u otros logs no deben usarse directamente sin el `sanitizeLogMessage`. Es posible que existan usos residuales de logs de depuración (e.g. `console.error`) en la UI y API.

## Situación
Existen multiples llamadas a `console.error` (e.g. en app/dashboard/page.tsx, app/login/page.tsx, app/companies/page.tsx) en el frontend y back donde no se esta usando `sanitizeLogMessage`.

## TODO Marker
- Buscar `console.error` en la carpeta `src/`.
- Eliminar o sanitizar con `sanitizeLogMessage`.

## Acción
Crear un fix para limpiar logs de consola.
