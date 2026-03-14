---
id: "refactorization-arquitectura-frontmatter-implementation"
description: "Documento de implementación para la migración a frontmatter."
status: "completed"
---
# Implementación: Migración Arquitectura Dual a Frontmatter

## Resumen de cambios

1. **Normas SddIA:** Se actualizaron `constitution.json` y `entidades-dominio-ecosistema-sddia.md` para reflejar la adopción de la arquitectura YAML Frontmatter.
2. **Contratos:** Se actualizaron los contratos bajo `SddIA/` (`actions-contract.json`, `patterns-contract.json`, `principles-contract.json`, `process-contract.json`, `skills-contract.json`, `tools-contract.json`) para requerir solo un archivo `.md` con Frontmatter.
3. **Conversión de Dual a Frontmatter:** Se desarrolló y ejecutó un script en NodeJS que unificó todos los pares de ficheros `spec.md` + `spec.json` dentro de `SddIA/`. Se excluyeron atributos duplicados como `title`, `description` y `purpose`.
4. **Excepciones:** El fichero `karma2-token/spec.json` se mantuvo intencionalmente sin cambios, en formato JSON-only, como estipula la norma.

## Touchpoints

* Todos los directorios dentro de `SddIA/actions`, `SddIA/patterns`, `SddIA/principles`, `SddIA/process`, `SddIA/security`, `SddIA/skills`, `SddIA/tools` y `SddIA/templates`.
