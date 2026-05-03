---
status: "active"
date: "2026-04-30"
---
# Especificaciones
Busqueda de ficheros con ocurrencia de \`console.error\` para su sanitizacion inyectando \`import { sanitizeLogMessage } from "@/lib/utils/logger"\` y envolviendo el mensaje en la función. Además, se reordenarán las importaciones con respecto a \`"use client"\` para evitar errores del compilador.
