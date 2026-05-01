---
id: create-skill-git-close-cycle-implementation
action_id: implementation
feature_id: create-skill-git-close-cycle
title: Touchpoints de implementación
date: "2026-05-01"
status: in_progress
touchpoints:
  - path: scripts/skills-rs/src/bin/git_close_cycle.rs
  - path: scripts/skills-rs/Cargo.toml
  - path: scripts/skills/git-close-cycle/
  - path: SddIA/skills/git-close-cycle/
  - path: SddIA/agents/cumulo.paths.json
  - path: scripts/skills/index.json
  - path: SddIA/actions/finalize-process/spec.md
  - path: SddIA/actions/finalize-process/spec.json
  - path: SddIA/norms/interaction-triggers.md
  - path: SddIA/skills/README.md
  - path: .cursor/rules/skill-suggestions.mdc
items:
  - id: T1
    description: Binario capsule_json entity_id git-close-cycle
  - id: T2
    description: Registrar cápsula y difundir listados (#Skill)
---

# Implementación

## Items

1. **Rust:** `git_close_cycle` reutiliza `gesfer_skills::git_cmd` y `capsule_json` como `git_sync_remote`.
2. **Cúmulo:** `paths.skillCapsules["git-close-cycle"]` → `./scripts/skills/git-close-cycle/`.
3. **finalize-process:** Último paso explícito **git-close-cycle**(`targetBranch` = rama de trabajo de la tarea).
4. **Difusión:** `interaction-triggers.md`, `skill-suggestions.mdc`, `SddIA/skills/README.md`, `index.json`.

## Ejemplo `.tekton_request.json` (cápsula)

```json
{
  "executable": "scripts/skills/git-close-cycle/bin/git_close_cycle.exe",
  "capsuleRequestRaw": "{\"meta\":{\"schemaVersion\":\"2.0\",\"entityKind\":\"skill\",\"entityId\":\"git-close-cycle\"},\"request\":{\"targetBranch\":\"feat/create-skill-git-close-cycle\"}}",
  "deleteRequestFile": true
}
```

Tras mutar `SddIA/`: segundo archivo de petición o paso aparte para `sddia_evolution_register` según `run-capsule-from-tekton-request.ps1` (`evolutionRegister`).
