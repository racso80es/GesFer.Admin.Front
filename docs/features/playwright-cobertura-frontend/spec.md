---
id: playwright-cobertura-frontend-spec
action_id: spec
feature_id: playwright-cobertura-frontend
title: "Especificación — Cobertura Playwright E2E Admin Front"
date: "2026-03-14"
status: draft
scope:
  - login
  - crud-organizaciones
  - logs
  - dashboard
  - proteccion-rutas
acceptance_criteria:
  - AC1: Login OK redirige a dashboard
  - AC2: Login KO muestra error y permanece en login
  - AC3: Listar organizaciones muestra tabla o estado vacío/error
  - AC4: Crear organización redirige a lista tras éxito
  - AC5: Editar organización redirige a lista tras éxito
  - AC6: Logs muestra tabla con columnas esperadas
  - AC7: Dashboard muestra resumen tras login
  - AC8: Rutas protegidas redirigen a login sin sesión
---

# Especificación — playwright-cobertura-frontend

## 1. Contexto

El frontend Admin (`src/`) ya dispone de:
- `src/playwright.config.ts` — configuración Playwright
- `src/tests/admin-e2e-mocked.spec.ts` — tests con mock API
- `src/tests/mock-api.js` — servidor mock para E2E sin backend real
- Rutas: `/login`, `/dashboard`, `/companies`, `/companies/new`, `/companies/[id]/edit`, `/logs`

## 2. Alcance técnico

### 2.1 Login

| Test | Descripción | Selectores / Flujo |
|------|-------------|--------------------|
| **login-ok** | Credenciales válidas → dashboard | `#username`, `#password`, `button[type="submit"]` → `expect(url).toContain('/dashboard')` |
| **login-ko-credenciales** | Credenciales inválidas → error visible | Submit con user/pass incorrectos → `expect(page.getByText(/credenciales inválidas/i))` |
| **login-ko-red** | API no disponible → error conexión | Mock 500 o timeout → `expect(page.getByText(/conectar|servidor/i))` |

### 2.2 CRUD Organizaciones (listar, crear, editar — delete omitido)

| Test | Descripción | Flujo |
|------|-------------|-------|
| **organizaciones-listar** | Lista visible o vacía | Login → `/companies` → `expect(h1: "Organizaciones")` y tabla o mensaje "No hay organizaciones" |
| **organizaciones-crear** | Crear nueva organización | Login → `/companies/new` → rellenar `#name`, `#address`, `#taxId`, `#email` → submit → `expect(url).toMatch(/\/companies$/)` |
| **organizaciones-editar** | Editar existente | Login → `/companies` → click en editar primera fila → modificar nombre → submit → lista |
| **organizaciones-validacion** | Campos requeridos | `/companies/new` → submit vacío → `expect(errors.name)` o similar |

**Nota:** Delete de organizaciones **omitido** (sin tests ni UI).

Formulario: `CompanyForm` usa `#name`, `#address`, `#taxId`, `#email`, `#phone`, `#languageId`, `data-test-id="company-form-name"`, etc.

### 2.3 Logs

| Test | Descripción | Flujo |
|------|-------------|-------|
| **logs-listar** | Tabla de logs visible | Login → `/logs` → `expect(h1: "Logs del sistema")` y tabla con columnas Fecha, Nivel, Mensaje, Origen |
| **logs-vacio** | Sin logs → mensaje | Si API devuelve vacío → "No hay logs registrados" |

### 2.4 Dashboard

| Test | Descripción | Flujo |
|------|-------------|-------|
| **dashboard-resumen** | Resumen cargado | Login → `/dashboard` → `expect("Dashboard Administrativo")`, `expect("Total Usuarios")` o similar |
| **dashboard-sesion** | Info de sesión visible | `expect("Usuario:")` o datos de sesión |

### 2.5 Protección de rutas

| Test | Descripción | Flujo |
|------|-------------|-------|
| **proteccion-dashboard** | Sin sesión → login | `page.goto('/dashboard')` → `expect(url).toContain('/login')` |
| **proteccion-companies** | Sin sesión → login | `page.goto('/companies')` → `expect(url).toContain('/login')` |
| **proteccion-logs** | Sin sesión → login | `page.goto('/logs')` → `expect(url).toContain('/login')` |

## 3. Estrategia de ejecución

### 3.1 Mock vs API real (decisión: ambos)

- **Mock (validate-pr y CI):** Tests con `mock-api.js`. No requiere API Admin. Ejecución en validate-pr y CI.
- **API real (validación manual):** Suite opcional contra API Admin (puerto 5010/5011). Credenciales desde `.env.test`.

### 3.2 Estructura de archivos (decisión: modular)

```
src/tests/
├── auth/
│   └── login.spec.ts          # login-ok, login-ko-credenciales, login-ko-red
├── companies/
│   └── crud.spec.ts           # listar, crear, editar, validación
├── logs/
│   └── logs.spec.ts           # listar, vacío
├── dashboard/
│   └── dashboard.spec.ts      # resumen, sesión
├── guards/
│   └── protected-routes.spec.ts # protección rutas
├── admin-e2e-mocked.spec.ts   # existente (refactorizar o deprecar)
├── mock-api.js               # existente
└── fixtures/
    └── auth.ts               # authenticatedPage fixture
```

### 3.3 Credenciales (decisión: .env.test)

- Archivo `.env.test` (no versionado, en `.gitignore`) con `E2E_ADMIN_USER` y `E2E_ADMIN_PASSWORD`.
- Para mock: valores fijos (ej. `admin`/`password`) que el mock acepte.
- Documentar en `.env.example` o README la existencia de `.env.test` para tests E2E con API real.

### 3.4 Fixtures y helpers

- **auth fixture:** `test.extend` con `authenticatedPage` que hace login y devuelve `page` con sesión.

## 4. Dependencias

- Playwright ya instalado (`playwright.config.ts`).
- API Admin para tests contra backend real (puerto 5010/5011 según `ADMIN_API_URL`).
- Mock API para tests sin backend.

## 5. Criterios de aceptación (resumen)

| ID | Criterio |
|----|----------|
| AC1 | Login OK redirige a `/dashboard` |
| AC2 | Login KO muestra mensaje de error y permanece en `/login` |
| AC3 | Listar organizaciones muestra tabla o estado vacío/error |
| AC4 | Crear organización redirige a `/companies` tras éxito |
| AC5 | Editar organización redirige a `/companies` tras éxito |
| AC6 | Logs muestra tabla con columnas Fecha, Nivel, Mensaje, Origen |
| AC7 | Dashboard muestra resumen (Total Usuarios, etc.) tras login |
| AC8 | Rutas protegidas redirigen a `/login` sin sesión |

**Nota:** Delete de organizaciones omitido.
