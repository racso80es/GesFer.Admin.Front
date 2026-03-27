# Norma — Sincronismo y trazabilidad SddIA (evolution)

## Ámbito

- **Incluye:** todo cambio **alta**, **baja** o **modificación** material sobre ficheros bajo `./SddIA/` (normas, agentes, procesos, skills, tokens, etc.), salvo que la norma o un ADR explícito excluya un subárbol.
- **No sustituye:** el registro de evolución de producto/feature en `paths.evolutionPath` / `EVOLUTION_LOG.md` (propósito distinto).

## Fuente de verdad

- Rutas: **solo** claves `paths.*` del Cúmulo (`SddIA/agents/cumulo.paths.json`), en particular `paths.sddiaEvolutionPath`, `paths.sddiaEvolutionLogFile`, `paths.sddiaEvolutionContractFile`.
- Contrato del detalle atómico: `evolution_contract.md` (v1.1) en `paths.sddiaEvolutionPath`.
- Identificador: **UUID v4** (`id_cambio`); fichero `{id_cambio}.md`.

## Obligaciones

1. **Doble registro:** actualizar el índice maestro (`Evolution_log.md`) y crear o actualizar el detalle `{id_cambio}.md` con frontmatter conforme al contrato.
2. **Tipología:** toda intervención se clasifica como `alta`, `baja` o `modificacion` (`tipo_operacion`).
3. **Bajas:** documentar `rutas_eliminadas` y `commit_referencia_previo` cuando aplique.
4. **Implementación:** registro e integridad vía **binarios Rust** (`sddia_evolution_register`, `sddia_evolution_validate`, `sddia_evolution_watch`) y contrato de cápsula; **no** scripts `.ps1` como entrega principal del registrador.

## Watcher y CI

- **Local:** watcher (`sddia_evolution_watch`) notifica cambios bajo `./SddIA/` (debounce); el operador o agente ejecuta `register` con los metadatos necesarios.
- **CI:** en PRs que alteran `./SddIA/`, debe pasar la validación (`sddia_evolution_validate`) según el workflow del repositorio.

## Relación con IDE

La difusión en `.cursor/rules/` refuerza esta norma; **no** la sustituye. Ante contradicción, prevalece **SddIA** canónico y CI.
