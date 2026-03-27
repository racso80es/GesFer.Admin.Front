# .github — Difusión de SddIA

Los artefactos en esta carpeta (templates, workflows) son **difusión** de las normas definidas en **SddIA**. No duplican reglas; enlazan a la fuente canónica.

- **Protocolo maestro:** [AGENTS.md](../AGENTS.md) (leyes universales, procesos, roles).
- **Normas de interacción:** [SddIA/norms/](../SddIA/norms/) (interaction-triggers, paths-via-cumulo).
- **Touchpoints:** [SddIA/norms/touchpoints-ia.md](../SddIA/norms/touchpoints-ia.md).

Al modificar .github, mantener coherencia con SddIA (rutas vía Cúmulo, procesos feature/bug-fix/refactorization/create-tool). Acción de revisión: [SddIA/actions/sddia-difusion/](../SddIA/actions/sddia-difusion/).

## PRs que alteran `./SddIA/`

Los cambios bajo `SddIA/` deben cumplir el protocolo **evolution** (registro con UUID, índice y detalle). El job **SddIA evolution validate** ejecuta `sddia_evolution_validate` tras el merge-base del PR. Norma: [SddIA/norms/sddia-evolution-sync.md](../SddIA/norms/sddia-evolution-sync.md). Touchpoints IA: [SddIA/norms/touchpoints-ia.md](../SddIA/norms/touchpoints-ia.md).
