# Fix Jest Haste Module Naming Collision

**ID:** fix-jest-haste-collision
**Type:** Kaizen / Bug Fix
**Source:** `docs/audits/AUDITORIA_2026_03_28.md`

## Description
The Kaizen audit reported a "Haste module naming collision" in Jest caused by the Next.js `.next/standalone/` build generation. The proposed fix is to ignore `.next/` in `jest.config.js`.

Upon investigation, it was found that `modulePathIgnorePatterns: ['<rootDir>/.next/']` is already present in `src/jest.config.js`.

This task serves to formally document this finding and process it through the SddIA automatic task workflow.
