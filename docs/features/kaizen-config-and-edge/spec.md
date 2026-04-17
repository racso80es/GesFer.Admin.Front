---
type: process
id: kaizen-config-and-edge
name: Kaizen Config and Edge Optimization
description: Refactoring config files to comply with Next.js Edge execution constraints and resolve the node module resolution warnings.
---

# Specification for Kaizen Config Optimization

## Background
According to `docs/audits/AUDITORIA_2026_03_21.md`, there was a critical issue where `config.ts` dynamically loaded `fs` and `path` to read local `.json` configurations. This causes build errors and runtime instability within the Edge runtime of Next.js.

## Requirements
- `loadConfig` in `src/lib/config.ts` must completely remove all references to `fs`, `path`, and reading local JSON.
- `src/lib/config.ts` must strictly rely on environment variables through the existing `getDefaultConfig(env)` function.