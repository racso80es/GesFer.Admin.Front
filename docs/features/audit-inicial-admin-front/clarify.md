# CLARIFY — Saneamiento y Adaptación de GesFer.Admin.Front

> **Acción:** clarify  
> **Fecha:** 2026-03-12  
> **Spec:** spec.md (SPEC-01 a SPEC-09)  
> **Estado:** clarify (confirmado por usuario 2026-03-12)

---

## 1. Clarificación de prioridades (CAMBIO CRÍTICO)

### CL-PRIO — Inversión del orden de fases

**Gap detectado en la spec:** El orden de ejecución propuesto priorizaba los cambios de código (Shared, Dockerfile) sobre la adecuación del ecosistema SddIA. Esto generaría un problema fundamental: **los agentes IA operarían con contexto incorrecto mientras se ejecutan las fases de código**, dando instrucciones de backend .NET a un proyecto frontend.

**Decisión:** Invertir el orden de fases. Primero corregir el contexto de la IA, después la infraestructura CI/CD, y por último el código fuente.

**Orden anterior (spec original):**

| Fase | Prioridad | SPECs |
|------|-----------|-------|
| ~~Fase 1~~ | ~~P0~~ | ~~SPEC-01, SPEC-02, SPEC-07~~ |
| ~~Fase 2~~ | ~~P1~~ | ~~SPEC-04, SPEC-08, SPEC-03~~ |
| ~~Fase 3~~ | ~~P2/P3~~ | ~~SPEC-05, SPEC-06, SPEC-09~~ |

**Orden corregido:**

| Fase | Prioridad | SPECs | Justificación |
|------|-----------|-------|---------------|
| **Fase 1** | **P0 — Crítica** | SPEC-05, SPEC-06, SPEC-09 | **Contexto IA correcto.** Agentes, constituciones, manifesto y documentación deben reflejar GesFer.Admin.Front antes de que la IA participe en cualquier acción de código. |
| **Fase 2** | **P1 — Alta** | SPEC-04, SPEC-08, SPEC-03 | **Infraestructura CI/CD.** Scripts, tools y workflow adaptados al frontend. Depende de Fase 1 (las tools SddIA deben estar definidas correctamente). |
| **Fase 3** | **P2 — Media** | SPEC-01, SPEC-02, SPEC-07 | **Código fuente.** Internalización Shared, Dockerfile, URLs. La IA ya opera con contexto correcto y puede asistir adecuadamente. |

**Impacto en dependencias:** El grafo de dependencias técnicas entre SPECs se mantiene (SPEC-01 → SPEC-02, etc.), pero dentro de cada fase. Las fases son secuenciales entre sí por contexto, no por dependencia técnica.

---

## 2. Clarificaciones por SPEC

### CL-05 — Agentes SddIA (SPEC-05, Fase 1)

**Gap 1: ¿Hasta qué punto modificar los agentes?**

Los agentes heredados del backend tienen dos tipos de contenido:

- **Contenido genérico** reutilizable (principios, constraints de seguridad, flujos de trabajo).
- **Contenido específico de backend** (.NET, C#, DbContext, EF Core).

**Clarificación:** Eliminar o sustituir únicamente el contenido específico de backend. No reescribir los agentes desde cero. Mantener la estructura, skills genéricas y constraints que apliquen.

**Gap 2: ¿Qué hacer con skills referenciadas que no existen en frontend?**

`tekton-developer` referencia skill `dotnet-development`. `qa-judge` también.

**Clarificación:** Reemplazar `dotnet-development` por `frontend-build` (ya existe como definición en `SddIA/skills/`). Si `frontend-build` no tiene contenido suficiente, ampliarlo.

**Gap 3: El agente `auditor` tiene doble rol (backend + frontend).**

**Clarificación:** Mantener el agente como "Auditor Frontend". Eliminar las instrucciones de backend (DbContext, CS1998, Command Pattern). Mantener y potenciar las instrucciones frontend (WCAG, path mapping, imports, accesibilidad). El `system_prompt` debe reflejar que este repo es frontend.

---

### CL-06 — Constituciones y Manifesto (SPEC-06, Fase 1)

**Gap 1: ¿Reescribir constituciones desde cero o solo actualizar referencias?**

**Clarificación:** Solo actualizar referencias. Las constituciones definen principios abstractos (cognitive, architect, audity, duality) que son conceptualmente válidos. Cambiar:
- Títulos y descripciones: "GesFer.Admin.Back" → "GesFer.Admin.Front"
- Ubicaciones: "src/ (proyectos .NET)" → "src/ (Next.js App Router)"
- Campos técnicos: adaptar a contexto frontend (loggerPath, storagePath, ipcBridge)

**Gap 2: `manifesto.json` — ¿Qué hacer con `dependency_rules.backend`?**

**Clarificación:** Eliminar `dependency_rules.backend` (no aplica). Mantener y adaptar `dependency_rules.frontend`. Actualizar `architecture_pillars` para reflejar la estructura real (`src/app/`, `src/components/`, `src/lib/`). Eliminar `seed_taxonomy`.

**Gap 3: `pr-acceptance-protocol.md` — ¿Qué validaciones reemplazar?**

**Clarificación:**

| Actual (backend) | Nuevo (frontend) |
|------------------|-----------------|
| `dotnet build src/GesFer.Admin.Back.sln` | `npm run build` |
| `dotnet test src/GesFer.Admin.Back.sln` | `npm run test` |
| Verificar compilación .NET | `npm run lint` + `npm run build` |

---

### CL-09 — Documentación (SPEC-09, Fase 1)

**Gap 1: `Objetivos.md` (raíz) — ¿Reescribir o eliminar?**

**Clarificación:** Reescribir. Debe describir los objetivos del proyecto GesFer.Admin.Front como frontend Admin independiente. Puede referenciarse al contexto histórico (extraído de monorepo GesFer) pero el foco debe ser el proyecto actual.

**Gap 2: Skills `invoke-command` e `invoke-commit` — ¿Solo cambiar contexto default?**

**Clarificación:** Sí. Cambiar `"contexto": { "default": "GesFer" }` a `"contexto": { "default": "GesFer.Admin.Front" }` en los spec.json y spec.md correspondientes. No hay otros cambios necesarios; los scripts de estas skills son genéricos.

---

### CL-04 — Scripts (SPEC-04, Fase 2)

**Gap 1: ¿Eliminar scripts o adaptarlos?**

**Clarificación por script:**

| Script | Decisión | Razón |
|--------|----------|-------|
| `Run-E2ELocal.ps1` | **Adaptar** | Base útil; reemplazar dotnet por playwright |
| `ejecutar-tests.ps1` | **Adaptar** | Reemplazar dotnet test por npm test |
| `validate-services-and-health.ps1` | **Adaptar** | Mantener lógica de health check; cambiar puertos/servicios |
| `install-front-dependencies.ps1` | **Simplificar** | Solo npm install en src/ |
| `cerrar-procesos-servicios.ps1` | **Adaptar** | Solo puertos frontend (3001) |
| `run-service-with-log.ps1` | **Adaptar** | Ejemplo con npm run dev |
| `scripts/Propuesta/` | **Mantener como referencia** | Documentos de propuesta históricos |

**Gap 2: `pr-skill.sh` y `commit-skill.sh` — ¿Son `.sh` en un proyecto Windows?**

**Clarificación:** Estos scripts `.sh` son ejecutados por git hooks (husky) que pueden ejecutar bash incluso en Windows (via Git Bash). Sin embargo, dado que el entorno definido es PowerShell, la acción ideal es:
1. Crear equivalentes `.ps1` o adaptar los `.sh` existentes.
2. Si se mantienen como `.sh`, asegurar que los comandos dentro sean `npm run build` / `npm run test` (no dotnet).

---

### CL-08 — Tools SddIA (SPEC-08, Fase 2)

**Gap 1: ¿Eliminar tools completamente o dejar la estructura vacía/marcada?**

**Clarificación por tool:**

| Tool | Decisión | Detalle |
|------|----------|---------|
| `invoke-mysql-seeds` | **Eliminar completa** | No aplica en frontend; eliminar carpeta de scripts y definición SddIA |
| `postman-mcp-validation` | **Eliminar completa** | Sin API local que validar |
| `start-api` → `start-frontend` | **Reescribir** | Nuevo config: `npm run dev`, puerto 3001, health check en `http://localhost:3001` |
| `run-tests-local` → `run-tests-frontend` | **Reescribir** | Nuevo config: `npm test`, `npm run test:e2e`, `npm run build` |
| `prepare-full-env` → `prepare-frontend-env` | **Simplificar** | Solo `npm install` + verificación de `.env` |

**Gap 2: ¿Actualizar `scripts/tools/index.json` y `SddIA/tools/` al eliminar/renombrar tools?**

**Clarificación:** Sí. Actualizar ambos:
- `scripts/tools/index.json`: eliminar entradas de tools eliminadas, añadir las nuevas.
- `SddIA/tools/`: eliminar carpetas de tools eliminadas, crear spec.md y spec.json para las nuevas.
- `cumulo.paths.json` → `toolCapsules`: actualizar con los nuevos nombres de tools.

---

### CL-03 — GitHub Workflow (SPEC-03, Fase 2)

**Gap 1: ¿Mantener `verify_pr_protocol` (Rust) o reemplazar por npm scripts?**

**Clarificación:** Evaluar coste/beneficio:
- **Opción A:** Adaptar `verify_pr_protocol.rs` para ejecutar `npm run build` y `npm run test` en lugar de dotnet. Mantiene la trazabilidad Rust del ecosistema SddIA.
- **Opción B:** Reemplazar por un paso directo en el workflow YAML que ejecute `npm run lint && npm run build && npm run test`. Más simple, menos dependencia de Rust.

**Decisión:** Opción B para la primera iteración. El workflow debe funcionar sin compilar Rust. Si en el futuro se requiere trazabilidad Rust, se puede reconstruir `verify_pr_protocol`.

**Gap 2: ¿Qué steps concretos en el workflow?**

**Clarificación:**

```yaml
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: 20
      cache: npm
      cache-dependency-path: src/package-lock.json
  - run: npm ci
    working-directory: src
  - run: npm run lint
    working-directory: src
  - run: npm run build
    working-directory: src
  - run: npm run test
    working-directory: src
```

---

### CL-01 — Internalización de Shared (SPEC-01, Fase 3)

**Gap 1: `lib/utils/cn.ts` — ¿Copiar de TmpMigration o mantener el local?**

**Clarificación:** Verificar si son idénticos. Si lo son, mantener el local (ya usa alias `@/`). Si TmpMigration tiene diferencias, evaluar cuál es más completo. En ambos casos, el resultado final debe estar en `src/lib/utils/cn.ts` con import `@/lib/utils/cn`.

**Gap 2: `lib/types/api.ts` — Tipos Country y City, ¿relevantes para Admin?**

**Clarificación:** Evaluar en momento de ejecución. Si la UI Admin gestiona países o ciudades, copiar. Si no, descartar. No bloquea la migración.

**Gap 3: ¿Copiar los archivos `.spec.tsx` (tests) de componentes shared?**

**Clarificación:** Sí. Mantener los tests (`Button.spec.tsx`, `Input.spec.tsx`) y adaptarlos para que funcionen con las rutas locales. Los tests validan el comportamiento de componentes que se van a internalizar.

**Gap 4: ¿Los componentes de TmpMigration usan rutas relativas internas — cómo adaptar?**

**Clarificación:** Los componentes en TmpMigration usan rutas relativas (ej. `../../lib/utils/cn`). Al moverlos a `src/components/ui/` y `src/components/shared/`, actualizar estos imports a alias `@/`:

- `../../lib/utils/cn` → `@/lib/utils/cn`
- `../ui/dialog` → `@/components/ui/dialog` (desde shared/)
- `../ui/button` → `@/components/ui/button` (desde shared/)
- `./button` → mantener relativo (dentro del mismo directorio ui/)

---

### CL-02 — Dockerfile (SPEC-02, Fase 3)

**Gap 1: ¿Dónde reside la app en la imagen?**

**Clarificación:** La app Next.js está en `src/`. El Dockerfile debe:
1. Copiar `src/package.json` y `src/package-lock.json`
2. `npm ci` en la carpeta donde estén
3. Copiar `src/` completo (excluyendo TmpMigration si aún existe al construir)
4. `npm run build`
5. Copiar standalone output

**Gap 2: ¿Crear carpeta `public/` vacía?**

**Clarificación:** Si no hay assets estáticos, la línea `COPY --from=builder .../public ./public` debe eliminarse o hacerse condicional. Next.js funciona sin `public/`. Si en el futuro se añaden assets, se re-agrega.

---

### CL-07 — URLs/Puertos (SPEC-07, Fase 3)

**Gap 1: ¿Cuál es la URL canónica de la API Admin en desarrollo?**

**Clarificación:** Según `.env.example`: `ADMIN_API_URL=https://localhost:5011`. Este debe ser el valor de referencia. Todos los fallbacks hardcoded deben apuntar aquí o, preferiblemente, no existir (forzar configuración vía .env).

**Gap 2: ¿Eliminar `localhost:5000` en dashboard o reemplazar?**

**Clarificación:** El dashboard referencia `localhost:5000` (API Product). Esto debe **reemplazarse** por la API Admin o, si el endpoint no existe en Admin, eliminar la llamada y dejar el dashboard con datos estáticos o un placeholder hasta que se implemente el endpoint correspondiente.

**Gap 3: ¿HTTP o HTTPS como fallback?**

**Clarificación:** En desarrollo local, la API Admin usa HTTPS (puerto 5011 según launchSettings). Los fallbacks deben usar `https://localhost:5011`, no `http://localhost:5010`. Si hay un redirect 5010→5011, documentarlo pero usar 5011 directamente.

---

## 3. Resumen de decisiones

| ID | Decisión | Impacto |
|----|----------|---------|
| **CL-PRIO** | Fases invertidas: Fase 1=SddIA, Fase 2=CI/CD, Fase 3=Código | Toda la spec |
| **CL-05.1** | Agentes: actualizar refs backend, no reescribir | SPEC-05 |
| **CL-05.2** | Reemplazar skill `dotnet-development` por `frontend-build` | SPEC-05 |
| **CL-05.3** | Auditor → "Auditor Frontend" | SPEC-05 |
| **CL-06.1** | Constituciones: solo actualizar referencias | SPEC-06 |
| **CL-06.2** | Eliminar `dependency_rules.backend` de manifesto | SPEC-06 |
| **CL-06.3** | PR protocol: dotnet → npm | SPEC-06 |
| **CL-09.1** | Objetivos.md: reescribir para Admin Front | SPEC-09 |
| **CL-09.2** | Skills invoke-*: cambiar contexto default | SPEC-09 |
| **CL-04.1** | Scripts: adaptar (no eliminar en general) | SPEC-04 |
| **CL-04.2** | pr-skill.sh/commit-skill.sh: adaptar contenido a npm | SPEC-04 |
| **CL-08.1** | Tools: 2 eliminar, 2 reescribir, 1 simplificar | SPEC-08 |
| **CL-08.2** | Actualizar index.json, SddIA/tools/ y cumulo.paths.json | SPEC-08 |
| **CL-03.1** | Workflow: npm scripts directos (sin Rust) en primera iteración | SPEC-03 |
| **CL-01.1** | cn.ts: mantener local si idéntico | SPEC-01 |
| **CL-01.2** | api.ts: evaluar en ejecución | SPEC-01 |
| **CL-01.3** | Tests (.spec.tsx): copiar y adaptar | SPEC-01 |
| **CL-01.4** | Imports internos: rutas relativas → alias @/ | SPEC-01 |
| **CL-02.1** | Dockerfile: estructura plana desde src/ | SPEC-02 |
| **CL-02.2** | Eliminar COPY public/ si no hay assets | SPEC-02 |
| **CL-07.1** | URL canónica dev: https://localhost:5011 | SPEC-07 |
| **CL-07.2** | Dashboard: reemplazar API Product por Admin o placeholder | SPEC-07 |
| **CL-07.3** | Fallbacks: HTTPS (5011), no HTTP (5010) | SPEC-07 |
