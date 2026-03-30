# Validation and QA

## Definition of Done
* All catch blocks inside `src/app/api/companies/[id]/route.ts` and `src/app/api/companies/route.ts` extract a safe string using a type guard.
* The original `error` object is never passed directly into `console.error` logs.
* `cd src && npx tsc --noEmit` exits with status 0.
* `cd src && npm run build` exits with status 0.
* `cd src && npm run test` exits with status 0.