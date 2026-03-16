---
id: playwright-cobertura-frontend-objectives
action_id: objectives
feature_id: playwright-cobertura-frontend
title: "Objetivos — Cobertura Playwright E2E para Admin Front"
date: "2026-03-14"
status: draft
branch: feat/playwright-cobertura-frontend
scope:
  - Login OK / KO
  - CRUD Organizaciones (listar, crear, editar)
  - Logs (listar, visualizar)
  - Dashboard (resumen cargado)
ley_aplicada: L5_COMPILACION, L6_CONSULTATION
paths_ref: Cúmulo paths.featurePath, src/tests, src/playwright.config.ts
---

# Objetivos — playwright-cobertura-frontend

## OBJ-01: Cobertura E2E con Playwright

Añadir y/o completar tests end-to-end con Playwright para el frontend administrativo GesFer.Admin.Front, cubriendo los flujos críticos de usuario.

## OBJ-02: Login

- **Login OK:** Credenciales válidas → redirección a `/dashboard`, sesión activa.
- **Login KO:** Credenciales inválidas → mensaje de error visible, permanece en `/login`.
- **Login KO (red):** API no disponible → mensaje de error de conexión.

## OBJ-03: CRUD Organizaciones (listar, crear, editar — delete omitido)

- **Listar:** Navegar a `/companies`, ver tabla de organizaciones (o mensaje vacío/error).
- **Crear:** Navegar a `/companies/new`, rellenar formulario, enviar → redirección a lista.
- **Editar:** Desde lista, ir a `/companies/[id]/edit`, modificar datos, guardar → redirección a lista.
- **Validación:** Campos requeridos (nombre, dirección) y email inválido.
- **Delete:** Omitido.

## OBJ-04: Logs

- Navegar a `/logs`, ver tabla de logs (o mensaje vacío/error).
- Verificar estructura de la tabla (Fecha, Nivel, Mensaje, Origen).

## OBJ-05: Dashboard

- Tras login OK, ver resumen administrativo (Total Companies, Total Usuarios, etc.).
- Verificar que las tarjetas de resumen se cargan correctamente.

## OBJ-06: Protección de rutas

- Sin sesión, acceso a `/dashboard`, `/companies`, `/logs` → redirección a `/login`.

## Alcance

- Tests en `src/tests/` (o estructura definida en spec).
- Configuración existente en `src/playwright.config.ts`.
- Integración con CI si aplica (npm scripts, validate-pr).
