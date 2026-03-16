---
id: playwright-cobertura-frontend-execution
action_id: execution
feature_id: playwright-cobertura-frontend
title: "Ejecución — Cobertura Playwright E2E"
date: "2026-03-14"
status: done
items_applied:
  - mock-api.js actualizado (paths /api/company, GET/PUT :id, logs)
  - fixtures/auth.ts con authenticatedPage
  - auth/login.spec.ts
  - companies/crud.spec.ts
  - logs/logs.spec.ts
  - dashboard/dashboard.spec.ts
  - guards/protected-routes.spec.ts
  - run-e2e-mock.ps1 para Windows
  - package.json test:e2e:mock:ps1
---

# Ejecución — playwright-cobertura-frontend

## Ítems aplicados

| Ítem | Archivo | Estado |
|------|---------|--------|
| Mock API | tests/mock-api.js | Paths /api/company, GET/PUT :id, /api/admin/logs |
| Fixture auth | tests/fixtures/auth.ts | authenticatedPage |
| Login | tests/auth/login.spec.ts | login-ok, login-ko-credenciales, login-ko-red |
| Companies | tests/companies/crud.spec.ts | listar, crear, editar, validación |
| Logs | tests/logs/logs.spec.ts | listar, vacío |
| Dashboard | tests/dashboard/dashboard.spec.ts | resumen, sesión |
| Guards | tests/guards/protected-routes.spec.ts | proteccion-dashboard, proteccion-companies, proteccion-logs |
| Script Windows | tests/run-e2e-mock.ps1 | PowerShell para mock + tests |
| npm script | package.json | test:e2e:mock:ps1 |

## Cómo ejecutar

**Linux/macOS (bash):**
```bash
cd src && npm run test:e2e:mock
```

**Windows (PowerShell):**
```powershell
cd src; npm run test:e2e:mock:ps1
```

**Requisitos:** Mock API en puerto 5050, variables ADMIN_API_URL, NEXTAUTH_URL, CLIENT_URL, AUTH_SECRET.

## Nota

Los tests de guards (protección de rutas) pasan sin mock. Los tests que requieren login necesitan el mock en ejecución y que el formulario de login se renderice (puede depender del tiempo de hidratación de NextAuth/SessionProvider).
