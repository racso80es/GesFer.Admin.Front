# Objectives

Refactor the error handling logic in the `companies` API route handlers to correctly utilize TypeScript type guards when extracting strings from the caught error objects.

This aligns with the architectural directive which strictly prohibits direct logging or returning of `unknown` error types in Catch blocks.

Target files:
- `src/app/api/companies/route.ts`
- `src/app/api/companies/[id]/route.ts`