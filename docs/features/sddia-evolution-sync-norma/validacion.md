---
feature_name: sddia-evolution-sync-norma
created: 2026-03-27
action: validate
status: completada
---

# Validación — sddia-evolution-sync-norma

## Checks realizados

- [x] `cargo build --release` en `paths.skillsRustPath` (binarios `sddia_evolution_*`).
- [x] `sddia_evolution_register` ejecutado con JSON de prueba; generado `{uuid}.md` y fila en `Evolution_log.md`.
- [x] Claves `sddiaEvolutionPath`, `sddiaEvolutionLogFile`, `sddiaEvolutionContractFile` en `cumulo.paths.json` y mención en `paths-via-cumulo.md`.
- [x] Norma `sddia-evolution-sync.md`, constitución (`L8_SDDIA_EVOLUTION`), regla `.cursor/rules/sddia-evolution-sync.mdc`.
- [x] Workflow PR: paso Rust + `sddia_evolution_validate` con merge-base.
- [ ] CI en GitHub: verificar en el PR que el job **SddIA evolution validate** pasa.

## Notas

Los `.exe` no se versionan (`.gitignore`); `install.ps1` reproduce las cápsulas en local/CI.
