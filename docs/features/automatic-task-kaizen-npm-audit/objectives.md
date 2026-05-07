---
title: "Fix NPM Audit Vulnerabilities (glob, postcss)"
type: "feature"
status: "active"
---

# Objectives

- Fix the moderate and high vulnerabilities reported by `npm audit` in the `src` folder.
- Specifically address `glob` (high) and `postcss` (moderate) using package.json overrides.
- Maintain the structural integrity and functionality of the Next.js application by avoiding major breaking upgrades during vulnerability patching.
- Ensure the build, lint, and test suites continue to pass successfully.
