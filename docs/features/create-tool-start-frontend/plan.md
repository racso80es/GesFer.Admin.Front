---
id: create-tool-start-frontend-plan
action_id: planning
feature_id: create-tool-start-frontend
title: "Plan — start-frontend Rust"
date: "2026-03-14"
status: done
phases:
  - id: F1
    name: Documentación
    tasks: [objectives, spec, clarify]
    status: done
  - id: F2
    name: Implementación Rust
    tasks: [start_frontend.rs, Cargo.toml]
    status: in_progress
  - id: F3
    name: Integración
    tasks: [install.ps1, Start-Frontend.bat]
    status: pending
  - id: F4
    name: Validación
    tasks: [cargo build, install.ps1, Start-Frontend.bat]
    status: pending
  - id: F5
    name: Spec SddIA
    tasks: [actualizar spec.md tools]
    status: pending
---

# Plan — create-tool-start-frontend

## Fase 1: Documentación ✅
- objectives.md, spec.md, clarify.md creados y actualizados con decisiones del usuario.

## Fase 2: Implementación Rust
1. Crear `scripts/tools-rs/src/bin/start_frontend.rs` (patrón start_api, adaptado a Next.js).
2. Añadir `[[bin]] name = "start_frontend"` en Cargo.toml.

## Fase 3: Integración
3. Actualizar install.ps1: añadir start-frontend a capsules; destino `scripts/tools/start-frontend/` (sin bin/).
4. Reescribir Start-Frontend.bat: cd a repo root, set GESFER_REPO_ROOT, invocar start_frontend.exe.

## Fase 4: Validación
5. `cargo build --release` en scripts/tools-rs.
6. Ejecutar install.ps1.
7. Ejecutar Start-Frontend.bat desde repo root; verificar health OK y salida JSON.

## Fase 5: Spec SddIA
8. Actualizar SddIA/tools/start-frontend/spec.md con sección Implementación Rust.
