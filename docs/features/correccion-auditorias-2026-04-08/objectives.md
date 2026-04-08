---
title: Corrección de hallazgos de Auditoría 2026-04-08
type: objectives
status: in_progress
---

# Objetivos

Corregir los hallazgos críticos detectados en la auditoría del 2026-04-08 para cumplir con los estándares de calidad de la infraestructura del proyecto.

## Hallazgos consolidados y priorizados

1. **🔴 Crítico: Manejo de errores inseguro (TypeScript `unknown` usage)**
   - Prioridad: Alta
   - Alcance: Múltiples archivos (routes API, pages, componentes) utilizan directamente el objeto de error inferido como `unknown` en los bloques `catch`, pasándolo a logs como `console.error(error)`.
   - Criterio de Cierre: Implementar Type Guards (`const message = error instanceof Error ? error.message : String(error);`) en todos los lugares identificados y loguear solo strings.

2. **🔴 Crítico: Violación de Integridad de Imports en el Frontend**
   - Prioridad: Alta
   - Alcance: Componentes de formulario de compañía están siendo importados usando rutas relativas largas (`../../../`) cruzando límites lógicos, lo cual está prohibido.
   - Criterio de Cierre: Reemplazar todas las rutas de importación relativas hacia componentes compartidos o cruces de dominio usando el path alias `@/`.