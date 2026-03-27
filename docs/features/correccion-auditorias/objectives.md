# Corrección Auditoría: Manejo de Errores Type Guard Frontend

**Objetivo:** Aplicar el protocolo de Corrección de Auditorías (Kaizen) detectado el 2026-03-27 en relación a los bloques catch.

El objetivo consiste en eliminar cualquier manipulación o logging directo del objeto `error` capturado (cuyo tipo es inferido `unknown` por TypeScript). En su lugar, es indispensable utilizar el operador de tipo `instanceof Error` para extraer el `message`.

Esto se alineará con la directiva: *"Strict TypeScript error handling is required. Inside `catch (error)` blocks, never log or use the inferred `unknown` error object directly"*.