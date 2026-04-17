---
id: fix-jest-haste-collision
type: automatic-task
status: active
date: "2026-03-28"
source: docs/audits/AUDITORIA_2026_03_28.md
---

# Specification

This task requires modifying `src/jest.config.js` to include `<rootDir>/.next/` in the `modulePathIgnorePatterns` array to prevent Jest from throwing a "Haste module naming collision" warning during test runs when Next.js generates the `.next/standalone/` build.

Upon review, it has been discovered that this configuration is already correctly in place in `src/jest.config.js`. Therefore, the implementation phase will solely involve confirming this and proceeding to document the validation and closure of the task.
