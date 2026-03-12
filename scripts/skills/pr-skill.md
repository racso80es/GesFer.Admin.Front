# PR Skill – Documentación

> **Herramienta:** `pr-skill.sh`
> **Ubicación:** `scripts/skills/pr-skill.sh`
> **Entorno:** Bash (Linux/macOS/Git Bash en Windows).

---

## 1. Propósito

El **PR Skill** es la barrera de calidad y seguridad antes de cada **push** (local) y en cada **Pull Request** (CI). Garantiza:

1. **Token de proceso** válido (solo local; en CI se omite).
2. **Build** correcto del frontend (`npm run build` en `src/`), con reintentos.
3. **Documentación de rama** presente para ramas que no sean `master`/`main`.
4. **Suite completa de tests** (`npm run test` en `src/`) ejecutada con éxito.

Si cualquier paso falla, el push/PR se **bloquea** y se registra en el log de auditoría.

---

## 2. Dónde se ejecuta

| Contexto | Disparador | Archivo |
|----------|------------|---------|
| **Local (pre-push)** | Hook Husky `pre-push` | `.husky/pre-push` → invoca `scripts/skills/pr-skill.sh` |
| **CI (GitHub Actions)** | Push/PR a `master` o `main` | `.github/workflows/pr-validation.yml` |

La ejecución debe hacerse **siempre desde la raíz del repositorio**.

---

## 3. Flujo (orden de pasos)

```
1. Detección de entorno (CI vs local)
2. [Solo local] Bypass opcional (BYPASS_AUDIT=1 + security-validation-skill.sh)
3. [Solo local] Validación de Token de Proceso (process-token-manager.sh Validate)
4. Build check (npm run build en src/, máx. 3 intentos)
5. Certificación documentación de rama (obligatoria si rama != master/main)
6. Suite completa de tests (npm run test en src/)
7. Registro en docs/audits/ACCESS_LOG.md y salida (éxito/fallo)
```

---

## 4. Dependencias

### 4.1 Ejecutables / entorno

- **Bash** (script con shebang `#!/bin/bash`).
- **Node.js 20+** y **npm** en PATH.
- **`git`** para nombre de rama y usuario (local).

### 4.2 Scripts del repositorio

| Script | Uso |
|--------|-----|
| `scripts/auditor/process-token-manager.sh` | Comandos `Validate` y `Generate` para el token de proceso (solo local). |
| `scripts/skills/security-validation-skill.sh` | Validación del bypass con `BYPASS_AUDIT=1` (solo local). |

### 4.3 Ejecución de tests

- **Build:** `npm run build` en `src/`.
- **Tests:** `npm run test` en `src/`.

### 4.4 Estructura de documentación

- **Log de acceso:** `docs/audits/ACCESS_LOG.md` (se crea si no existe).
- **Documentación de rama:** para rama distinta de `master`/`main` debe existir al menos uno de:
  - `docs/branches/<slug>.md`
  - `docs/branches/<slug>/OBJETIVO.md`
  donde `<slug>` es el nombre de la rama con `/` y `\` sustituidos por `-`.

### 4.5 Variables de entorno

| Variable | Efecto |
|----------|--------|
| `GITHUB_ACTIONS=true` | Modo CI: se omite token y se usa rama del evento. |
| `BYPASS_AUDIT=1` | Solo local: intenta bypass vía `security-validation-skill.sh`. |

---

## 5. Salidas y códigos de retorno

- **0:** Todas las comprobaciones pasaron; push/PR permitido.
- **1:** Fallo en token, build, documentación de rama o tests; push/PR bloqueado.

Cada ejecución se registra en `docs/audits/ACCESS_LOG.md`.

---

## 6. Build check

- Se ejecuta `npm run build` en `src/` hasta **3 veces** con 3 segundos entre intentos.
- Si tras 3 intentos sigue fallando, se escribe un log en `docs/diagnostics/<rama>/build_error_final.log`.

---

## 7. Uso en Windows

El script es **Bash**; no hay `pr-skill.ps1`. En Windows:

- **Pre-push (Husky):** el hook llama a `bash scripts/skills/pr-skill.sh` (requiere **Git Bash**).
- **CI:** se ejecuta en `ubuntu-latest`, sin cambios.
