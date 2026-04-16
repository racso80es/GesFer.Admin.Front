# Plan

1. Create a tracking issue in `docs/features/kaizen-error-handling-companies`.
2. Find `console.error` usages passing raw `error` objects in `src/app/api/companies`.
3. Apply `const message = error instanceof Error ? error.message : String(error);` replacement.
4. Pass the extracted string instead of the raw `error` object.
5. Re-compile using `npx tsc --noEmit` and run `npm run build`.
6. Verify no compile errors remain.