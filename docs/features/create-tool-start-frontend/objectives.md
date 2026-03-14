---
id: create-tool-start-frontend-objectives
action_id: objectives
feature_id: create-tool-start-frontend
title: "Objetivos — Adecuar start-frontend al estándar Rust exe"
date: "2026-03-14"
status: done
branch: feat/create-tool-start-frontend
scope:
  - Migrar tool start-frontend de .bat a ejecutable Rust (.exe)
  - Cumplir SddIA/tools/tools-contract.json
  - Mantener paridad funcional con implementación actual
ley_aplicada: L4_BUILD, L6_CONSULTATION
paths_ref: Cúmulo paths.toolCapsules.start-frontend, paths.toolsRustPath
---

# Objetivos — create-tool-start-frontend

## OBJ-01: Migración a Rust

Adecuar la tool **start-frontend** al estándar de implementación Rust (.exe) definido en:

- SddIA/constitution.json → configuration.skills_tools_implementation: rust
- SddIA/tools/tools-contract.json → default_implementation.language: rust
- SddIA/process/create-tool/spec.md → implementación única como ejecutable Rust

## OBJ-02: Paridad funcional

La implementación Rust debe preservar el comportamiento actual:

- Ejecutar `npm run dev` en `src/`
- Puerto por defecto 3001
- Health check en `http://localhost:3001` (HTTP 200)
- Códigos de salida: 0 (éxito), 1 (config inválido), 2 (puerto ocupado), 7 (health timeout)
- Fases: init → port-check → launch → healthcheck → done | error

## OBJ-03: Estructura de cápsula

Cumplir la estructura (tools-contract.json). El .exe en la ruta de la tool, sin carpeta bin/:

```
scripts/tools/start-frontend/
├── start_frontend.exe
├── manifest.json
├── start-frontend-config.json
├── start-frontend.md
└── Start-Frontend.bat   # Launcher que invoca start_frontend.exe
```

## OBJ-04: Fuente Rust

Código fuente en `scripts/tools-rs/src/bin/start_frontend.rs`, compilado y copiado a la cápsula mediante `install.ps1`.

## OBJ-05: Eliminación de implementación legacy

Tras validar el .exe, eliminar la implementación actual que solo usa .bat para ejecutar npm directamente (sin healthcheck ni salida JSON contractual).
