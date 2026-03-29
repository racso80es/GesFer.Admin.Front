---
feature: "fix-error-logging"
status: "active"
date_started: "2026-03-23"
---
# Objetivos de la tarea
Corregir los logs de error en los route handlers de `src/app/api/companies/` para cumplir con la directiva estricta de TypeScript, la cual prohíbe pasar el objeto de error crudo en `console.error`. Se debe extraer el mensaje usando un type guard para evitar que información sensible u objetos complejos lleguen a los logs de la consola.
