---
id: playwright-cobertura-frontend-clarify
action_id: clarify
feature_id: playwright-cobertura-frontend
title: "Clarificación — Cobertura Playwright E2E"
date: "2026-03-14"
status: done
decisions:
  - mock_vs_api: "Ambos: suite mock para CI + suite API real para validación manual"
  - credenciales: ".env.test (no versionado) con credenciales de test"
  - delete_organizaciones: "OMITIDO: solo listar, crear y editar (sin eliminar)"
  - estructura_tests: "Modular (auth/, companies/, logs/, dashboard/, guards/)"
  - ci_integration: "Mockeado en validate-pr y CI (tests con mock en ambos)"
clarify_pending: []
---

# Clarificación — playwright-cobertura-frontend

## Decisiones del usuario (2026-03-14)

| # | Tema | Decisión |
|---|------|----------|
| 1 | Mock vs API | **C** — Ambos: suite mock para CI + suite API real para validación manual |
| 2 | Credenciales | **C** — Archivo `.env.test` (no versionado) con credenciales de test |
| 3 | Delete orgs | **OMITIDO** — Solo listar, crear y editar. Sin eliminar. |
| 4 | Estructura | **A** — Modular (auth/, companies/, logs/, dashboard/, guards/) |
| 5 | CI/validate | **Mockeado** — Tests con mock en validate-pr y en CI |

---

## Preguntas originales (referencia)

### 1. Mock vs API real → C
Ambos: suite mock para CI + suite API real para validación manual o CI con backend.

### 2. Credenciales → C
Archivo `.env.test` (no versionado) con credenciales de test.

### 3. CRUD Organizaciones → OMITIR delete
Solo listar, crear y editar. **Se omite** la eliminación de organizaciones (sin implementar UI delete ni tests de delete).

### 4. Estructura → A
Modular: auth/login.spec.ts, companies/crud.spec.ts, logs/logs.spec.ts, dashboard/dashboard.spec.ts, guards/protected-routes.spec.ts.

### 5. CI/validate → Mockeado
Tests Playwright con mock en validate-pr y en CI (sin requerir API Admin en ejecución).
