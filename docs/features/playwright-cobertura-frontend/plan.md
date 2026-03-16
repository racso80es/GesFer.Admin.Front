---
id: playwright-cobertura-frontend-plan
action_id: planning
feature_id: playwright-cobertura-frontend
title: "Plan — Cobertura Playwright E2E"
date: "2026-03-14"
status: done
phases:
  - id: "1"
    name: "Actualizar mock-api.js"
    tasks:
      - Corregir paths /api/company, /api/company/:id
      - Añadir GET /api/admin/logs
  - id: "2"
    name: "Crear fixtures"
    tasks:
      - fixtures/auth.ts con authenticatedPage
  - id: "3"
    name: "Tests auth"
    tasks:
      - auth/login.spec.ts (login-ok, login-ko-credenciales, login-ko-red)
  - id: "4"
    name: "Tests companies"
    tasks:
      - companies/crud.spec.ts (listar, crear, editar, validación)
  - id: "5"
    name: "Tests logs"
    tasks:
      - logs/logs.spec.ts (listar, vacío)
  - id: "6"
    name: "Tests dashboard"
    tasks:
      - dashboard/dashboard.spec.ts (resumen, sesión)
  - id: "7"
    name: "Tests guards"
    tasks:
      - guards/protected-routes.spec.ts (protección rutas)
  - id: "8"
    name: "Integración"
    tasks:
      - Actualizar test:e2e:mock para ejecutar todos los specs
      - Verificar validate-pr incluye E2E mock
tasks: []
---

# Plan — playwright-cobertura-frontend

## Fase 1: Actualizar mock-api.js

- Corregir path companies: `/company` → `/api/company` (baseUrl ya incluye /api)
- Añadir GET `/api/company/:id` y PUT `/api/company/:id` para editar
- Añadir GET `/api/admin/logs` con respuesta paginada

## Fase 2: Fixtures

- `src/tests/fixtures/auth.ts`: `test.extend` con `authenticatedPage` que hace login (admin/password) y devuelve page con sesión.

## Fase 3–7: Specs modulares

| Spec | Tests |
|------|-------|
| auth/login.spec.ts | login-ok, login-ko-credenciales, login-ko-red |
| companies/crud.spec.ts | listar, crear, editar, validación |
| logs/logs.spec.ts | listar, vacío |
| dashboard/dashboard.spec.ts | resumen, sesión |
| guards/protected-routes.spec.ts | proteccion-dashboard, proteccion-companies, proteccion-logs |

## Fase 8: Integración

- test:e2e:mock ejecuta todos los specs (no solo admin-e2e-mocked.spec.ts)
- Deprecar o refactorizar admin-e2e-mocked.spec.ts (opcional: mantener como smoke rápido)

## Orden de ejecución

1. Mock (Fase 1)
2. Fixtures (Fase 2)
3. Specs (Fases 3–7) — pueden implementarse en paralelo
4. Integración (Fase 8)
