---
id: "refactorization-arquitectura-frontmatter-spec"
description: "Especificación para la refactorización a frontmatter."
---
# SPEC: Refactorización Arquitectura Dual → Frontmatter en SddIA

## 1. Información General

| Campo | Detalle |
| :--- | :--- |
| **ID de Especificación** | SPEC-REF-2026-002 |
| **Rama Relacionada** | feat/refactorization-arquitectura-frontmatter |

## 2. Propósito y Contexto

Optimizar la arquitectura dual actual (spec.md + spec.json) del ecosistema SddIA mediante migración hacia **Markdown con Frontmatter YAML**. El resultado final será un único archivo `.md` por entidad con metadatos estructurados en frontmatter y contenido legible en el cuerpo.

## 3. Arquitectura y Diseño Técnico

### Formato objetivo (Frontmatter YAML + MD)

```markdown
---
id: "e98e4d2a-1c3f-4e56-9a2b-8f7d6c5b4a12"
category: "Arquitectura de Software"
---
# Título del Patrón
Contenido en lenguaje natural...
```
