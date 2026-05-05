---
title: "Fix NPM Audit Vulnerabilities Spec"
type: "feature"
status: "active"
---

# Specification

We will update `src/package.json` to override `glob` to `10.4.5` and `postcss` to `8.5.1` (or whatever the patched version is) to clear `npm audit` warnings.

- `glob` 10.4.5 fixes the CLI command injection.
- `postcss` 8.5.1 fixes XSS vulnerabilities.

We must run `npm install --legacy-peer-deps` after modifying `package.json`.
Then we run `npm audit` to ensure 0 vulnerabilities.
Finally, we run `npm run build` and `npm run test` to verify no regressions.
