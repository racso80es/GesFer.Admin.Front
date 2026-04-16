# Kaizen Action: Fix Jest Haste Map Collision

- **Source:** `docs/audits/AUDITORIA_2026_03_28.md`
- **Issue:** Haste module naming collision in Jest caused by Next.js build (`.next/standalone/`).
- **Action:** Add `<rootDir>/.next/` to `modulePathIgnorePatterns` in `src/jest.config.js`.
- **Note:** The issue was already implemented in `src/jest.config.js`. This action serves to document the process and complete the Kaizen Action required by the audit.