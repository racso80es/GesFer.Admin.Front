# Objectives

- Refactor `src/lib/config.ts` to strictly rely on environment variables injected without using Node.js filesystem capabilities in the frontend to avoid issues during the Edge build.
- This is part of the `automatic-task` and Kaizen audit resolution from `AUDITORIA_2026_03_21.md`.