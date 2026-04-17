---
title: Specification - Kaizen Jest Haste Map Fix
---

# Specification

- Issue to address: Jest haste map collision during `npm run test`.
- Required fix: Add `<rootDir>/.next/` to `modulePathIgnorePatterns` in `src/jest.config.js`.
- Given the fix was previously applied, the specification revolves around proper tracking and documenting the solution through the standard Kaizen audit process.