---
process_id: "automatic-task"
name: "Kaizen: Config Edge Cleanup"
---

# Specification

- **Requirement:** Refactor `loadConfig()` in `src/lib/config.ts`.
- **Action:** Remove the conditional block `if (typeof window === 'undefined')` that uses `fs` and `path`.
- **DoD:** `src/lib/config.ts` no longer contains references to `fs` or `path` and purely returns `getDefaultConfig(env)`. Build should succeed without failures.
