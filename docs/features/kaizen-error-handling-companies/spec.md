---
feature_name: kaizen-error-handling-companies
status: active
type: improvement
---

# Specification

Based on `docs/audits/AUDITORIA_2026_03_23.md`, the following files contain raw error logging passing the `unknown` error object directly to `console.error`:
- `src/app/api/companies/route.ts` (POST method)
- `src/app/api/companies/[id]/route.ts` (GET, PUT, DELETE methods)

Implementation details:
- Refactor the code in these route handlers.
- Extract the error message using a type guard: `const message = error instanceof Error ? error.message : String(error);`.
- Use the extracted string `message` instead of `error` object.
- Pass the string as `detail` inside the `NextResponse.json` payload when applicable to prevent runtime failures where functions expect a string.