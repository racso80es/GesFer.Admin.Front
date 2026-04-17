---
type: "objectives"
feature: "correccion-auditoria-2026-04-01"
status: "active"
---

# Objetivos de la Corrección de Auditoría 2026-04-01

- Resolver las fugas de capa detectadas en `src/app/` donde los componentes se importaban con rutas relativas largas cruzando límites lógicos (`../../../`).
- Actualizar los imports en `src/app/companies/new/page.tsx`, `src/app/companies/[id]/edit/page.tsx` para usar el alias de importación absoluta `@/components/...`.
- Resolver el uso de rutas relativas entre subdirectorios de componentes (`src/components/companies/` -> `src/components/ui/`) asegurando que utilicen `@/components/ui/` para mantener consistencia.
