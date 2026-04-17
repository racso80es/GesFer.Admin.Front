# Objetivos - Corrección Auditoría 2026-04-04

## Propósito
Corregir los hallazgos reportados en `docs/audits/AUDITORIA_2026_04_04.md` para cumplir con las métricas de calidad y arquitectura definidas por el Guardián de la Infraestructura.

## Hallazgos Consolidados (Kaizen Roadmap)
1. **[CRÍTICO] Arquitectura Edge (`src/lib/config.ts`)**: Eliminar importaciones de `fs` y `path` vía `__non_webpack_require__` y depender puramente de variables de entorno, estabilizando el build Next.js.
2. **[CRÍTICO] Nomenclatura e Integridad de Imports**: Corregir rutas relativas largas a favor de alias `@/` en las páginas de companies (`new` y `edit`).
3. **[MEDIO] Estabilidad y Seguridad (Type guards en Errores)**: Aplicar type guards de TypeScript en bloques `catch` para manejar tipos `unknown` antes de loguearlos o usarlos en componentes, APIs y funciones core.

## Criterios de Cierre (Definition of Done)
- El bloque `if (typeof window === 'undefined'...)` en `src/lib/config.ts` ha sido removido y usa el default config.
- Las páginas de creación y edición de organizaciones en `src/app/companies/` usan `@/components/...`.
- Múltiples bloques `catch` implementan `error instanceof Error ? error.message : String(error)`.
- El proyecto compila satisfactoriamente (`npm run build`).
- Las pruebas pasan exitosamente (`npm run test`).
