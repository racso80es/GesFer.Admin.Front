---
process_id: feature
name: actualizacion-readme
description: Unificar readme.md principal con posibles readme en src. Además analiza la solución para adecuar el contenido para que sea un reflejo de este.
phases:
  - Preparacion
  - Tracking
  - Unificacion
  - Validacion
  - Finalizacion
persist_ref: docs/features/actualizacion-readme
---

# Especificación

Esta tarea, proveniente del backlog, consiste en la unificación del `README.md` del proyecto.
Debe eliminar `src/README.md` y centralizar la información (frontend, configuración, desarrollo, arquitectura, testing, multi-agente) en la raíz.