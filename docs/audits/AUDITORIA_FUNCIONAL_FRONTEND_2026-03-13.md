# Auditoría Funcional — GesFer.Admin.Front

> **Tipo:** Validación funcional (usuario final)  
> **Fecha:** 2026-03-13  
> **Contexto:** paths.auditsPath (Cúmulo)  
> **Proceso:** SddIA/tools/audit-funcional-frontend/ (tool de proceso, repetible)  
> **Estado:** Inicio

---

## 1. Objetivo

Realizar las funciones propias de usuario y validar el correcto funcionamiento del frontend GesFer.Admin.Front, actuando como usuario administrativo.

---

## 2. Descripción

- **API backend:** Activa (GesFer.Admin.Back en puerto 5011).
- **Frontend:** Levantar y validar que sus funcionalidades tienen el comportamiento definido.
- **Criterio de aceptación:** Se han comprobado las funcionalidades del front reemplazando a usuario.

---

## 3. Precondiciones

| Requisito | Verificación |
|-----------|---------------|
| API Admin activa | `https://localhost:5011` o `http://localhost:5011` (según contexto servidor/cliente) |
| Variables de entorno | `ADMIN_API_URL`, `AUTH_SECRET`, opcionalmente `NEXT_PUBLIC_ADMIN_DEFAULT_USERNAME` / `NEXT_PUBLIC_ADMIN_DEFAULT_PASSWORD` |
| Credenciales válidas | Usuario admin con acceso a la API Admin |
| Node.js / npm | Dependencias instaladas en `src/` |

---

## 4. Funcionalidades a validar

### 4.1 Mapa de rutas

| Ruta | Descripción | API utilizada |
|------|-------------|---------------|
| `/login` | Login administrativo | `POST /api/admin/auth/login` (API Admin) |
| `/dashboard` | Dashboard con resumen | `GET /api/admin/dashboard/summary` |
| `/companies` | Listado de organizaciones | `GET /api/companies` (Next.js route → API Admin `/company`) |
| `/companies/new` | Crear organización | `POST /api/companies` |
| `/companies/[id]/edit` | Editar organización | `GET` y `PUT /api/companies/[id]` |
| `/logs` | Logs (en Sidebar) | ⚠️ **Pendiente:** ruta no implementada en `src/app/` |

### 4.2 Flujos de usuario

#### F1 — Autenticación
1. Acceder a `http://localhost:3001/login`.
2. Introducir credenciales válidas (admin).
3. **Esperado:** Redirect a `/dashboard`, sesión activa.
4. **Errores a comprobar:** Credenciales inválidas, API no disponible.

#### F2 — Dashboard
1. Tras login, ver resumen (empresas, usuarios, artículos, proveedores, clientes).
2. **Esperado:** Cards con datos numéricos, información de sesión.
3. **Errores a comprobar:** 401/403, fallo de conexión.

#### F3 — Organizaciones (CRUD)
1. **Listar:** Ir a `/companies` → tabla con nombre, CIF, email, estado, acciones.
2. **Crear:** Clic en "Nueva Organización" → formulario → guardar → volver a listado.
3. **Editar:** Clic en lápiz de una fila → formulario pre-rellenado → guardar → volver a listado.
4. **Esperado:** Datos persistentes vía API Admin.

#### F4 — Navegación y cierre de sesión
1. Sidebar: Dashboard, Organizaciones, Logs (si existe).
2. Cerrar sesión → redirect a `/login`.

---

## 5. Plan de ejecución

### Paso 1 — Levantar frontend

**Según SddIA:** Usar tool `start-frontend` (paths.toolCapsules.start-frontend) o equivalente.

- Desde `src/`: `npm run dev` (puerto 3001).
- Verificar que la app responde en `http://localhost:3001`.

### Paso 2 — Validación manual (reemplazando a usuario)

| # | Acción | Resultado esperado | ✓/✗ |
|---|--------|--------------------|-----|
| 1 | Abrir `/login` | Formulario de login visible | |
| 2 | Login con credenciales válidas | Redirect a `/dashboard` | |
| 3 | Dashboard carga resumen | Cards con datos, sin error | |
| 4 | Navegar a `/companies` | Listado de organizaciones | |
| 5 | Crear nueva organización | Formulario → guardar → listado actualizado | |
| 6 | Editar organización existente | Formulario pre-rellenado → guardar → listado | |
| 7 | Cerrar sesión | Redirect a `/login` | |
| 8 | Acceso a `/dashboard` sin sesión | Redirect a `/login` | |

### Paso 3 — Registro de hallazgos

Documentar en este mismo archivo o en `INTERACCIONES_YYYY-MM-DD_HHmm.md` (paths.auditsPath) cualquier desviación del comportamiento esperado.

### Paso 4 — Kaizen

Tras la auditoría, aplicar mejoras continuas:

- Corregir hallazgos de severidad alta o crítica.
- Registrar acciones de mejora derivadas de los hallazgos.
- Actualizar el proceso (tool `audit-funcional-frontend` en SddIA/tools) si se identifican nuevos flujos o criterios.

**Proceso repetible:** SddIA/tools/audit-funcional-frontend/ (spec.md, spec.json).

---

## 6. Hallazgos conocidos (pre-auditoría)

| ID | Descripción | Severidad |
|----|-------------|-----------|
| H-01 | Ruta `/logs` en Sidebar sin página implementada | Media |
| H-02 | Mensaje de error en `companies/page.tsx` menciona puerto 5010; API Admin usa 5011 | Baja |
| H-03 | `companies/new` y `companies/[id]/edit` no muestran feedback de error al usuario en caso de fallo (solo `console.error`) | Media |

---

## 7. Resultado de auditoría

*(A rellenar tras la ejecución)*

- **Fecha ejecución:** _______________
- **Ejecutado por:** _______________
- **Resultado global:** ☐ Aprobado ☐ Con observaciones ☐ No aprobado
- **Observaciones:** _______________

---

*Documento generado por rol Auditor. paths.auditsPath: docs/audits/.*
