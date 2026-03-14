---
id: "refactorization-arquitectura-frontmatter-objectives"
description: "Objetivos para la refactorización de arquitectura dual a frontmatter."
---
# Refactorización: Arquitectura Dual (MD + JSON) → Frontmatter en SddIA

**Rama:** feat/refactorization-arquitectura-frontmatter

---

## Objetivo

Refactorizar el sistema SddIA para optimizar la arquitectura dual actual (spec.md + spec.json) migrando hacia **Markdown con Frontmatter YAML** en todos los ficheros de documentación y contratos.

---

## Alcance

- Auditar los pares duales en SddIA/ y transformarlos a un formato de fichero único (`spec.md` con Frontmatter YAML).
- Optimizar la ventana de contexto de la IA al entregarle la entidad de forma atómica y cohesionada.
- Actualización de normas SddIA (constitution.json, entidades-dominio-ecosistema-sddia.md, contratos).
- Migración automatizada en este entorno de trabajo mediante un script ad-hoc en NodeJS.
- Toda entidad SddIA ha de respetar la nueva estructura. Excepción: karma2-token (JSON-only).

### Entidades afectadas (SddIA)
Se afectaron las entidades dentro de:
- SddIA/actions/
- SddIA/patterns/
- SddIA/principles/
- SddIA/process/
- SddIA/security/
- SddIA/skills/
- SddIA/tools/
- SddIA/templates/

---

## Ley aplicada

- **L7_DOMAIN_ENTITIES (constitution.json):** Las entidades de dominio **deben** tener estructura (Markdown with YAML frontmatter) salvo excepciones como tokens.
- **SddIA/norms/entidades-dominio-ecosistema-sddia.md:** Estructura obligatoria actualizada.
