# Aclaraciones

- ¿Existen otros archivos que omitieron los Type Guards?
  - Respuesta: La auditoría del 23 de marzo especifica claramente los 2 archivos y los endpoints que aún fallan. El endpoint GET de `/api/companies` ya ha sido arreglado, así como otros elementos listados en el reporte.

- ¿El error object se necesita para algo más?
  - Respuesta: No, la directiva estricta requiere evitar el paso de objetos `unknown` por console.error, y el string extraído a través del type guard es suficiente para el debugging.
