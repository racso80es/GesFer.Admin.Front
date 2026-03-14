---
id: "refactorization-arquitectura-frontmatter-plan"
description: "Plan de acción para la migración a frontmatter."
---
# PLAN: Refactorización Arquitectura Dual → Frontmatter en SddIA

**Proceso:** refactorization

---

## 1. Objetivos del plan

- **Fase 1:** Preparación, crear documentación en el nuevo contexto, y limpiar recursos innecesarios.
- **Fase 2:** Actualizar normas y contratos (constitution.json, normas, etc.).
- **Fase 3:** Crear script de conversión (NodeJS).
- **Fase 4:** Migración. Ejecutar la transformación sobre SddIA/ omitiendo karma2-token.
- **Fase 5:** Limpieza y validación post-migración.

---

## 2. Ejecución

- Todas las fases se ejecutan directamente en el contenedor actual, modificando el código fuente y generando la evidencia en `implementation.md` y `validacion.md`.
