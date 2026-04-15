# Objectives

- Fix the Jest haste module naming collision caused by the Next.js standalone build generation (`.next/standalone/`).
- Formalize the change based on the audit report `AUDITORIA_2026_03_28.md`.

## Definition of Done (DoD)
- The test suite in `src/` should run successfully.
- No warnings about "jest-haste-map: Haste module naming collision" should appear in the logs.