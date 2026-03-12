#!/bin/bash
# PR Skill — GesFer.Admin.Front
# Trigger: pre-push (local) o GitHub Actions (CI)
# Actions: [CI skip Token] Build Check -> Branch Doc Check -> All Tests

set -e
LOG_FILE="docs/audits/ACCESS_LOG.md"
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

if [ -n "$GITHUB_ACTIONS" ] && [ "$GITHUB_ACTIONS" = "true" ]; then
    CI_MODE=1
    USER_NAME="github-actions"
    BRANCH="${GITHUB_HEAD_REF:-${GITHUB_REF#refs/heads/}}"
else
    CI_MODE=0
    USER_NAME=$(git config user.name 2>/dev/null || echo "local")
    BRANCH=$(git branch --show-current 2>/dev/null || echo "detached")
fi

log_entry() {
    local status="$1"
    local message="$2"
    echo "| $TIMESTAMP | $USER_NAME | $BRANCH | PUSH/PR | $status | $message |" >> "$LOG_FILE"
}

if [ ! -f "$LOG_FILE" ]; then
    mkdir -p docs/audits
    echo "| Timestamp | User | Branch | Action | Status | Details |" > "$LOG_FILE"
    echo "|---|---|---|---|---|---|" >> "$LOG_FILE"
fi

# --- Bypass (solo local) ---
if [ "$CI_MODE" -eq 0 ] && [ "$BYPASS_AUDIT" = "1" ]; then
    echo "BYPASS DETECTADO: Ejecutando validacion de seguridad..."
    bypass_ok=0
    ./scripts/skills/security-validation-skill.sh "BYPASS_TOKEN" "PUSH_BYPASS" || bypass_ok=$?
    if [ "${bypass_ok}" -eq 0 ]; then
        log_entry "WARNING" "Bypass ejecutado exitosamente via variable de entorno"
        exit 0
    else
        log_entry "BLOCKED" "Fallo en validacion de seguridad del Bypass"
        exit 1
    fi
fi

# --- Token de proceso (solo local) ---
if [ "$CI_MODE" -eq 0 ]; then
    echo "[AUDITOR] Validando Token de Proceso..."
    if ! ./scripts/auditor/process-token-manager.sh Validate; then
        log_entry "BLOCKED" "Token invalido o expirado"
        echo "Token invalido. Ejecute 'scripts/auditor/process-token-manager.sh Generate'"
        exit 1
    fi
else
    echo "[CI] Ejecucion en GitHub Actions; validacion de token omitida."
fi

# --- Build Check (npm run build, max 3 intentos) ---
echo "--- Build Check (max. 3 intentos) ---"
RETRY_MAX=3
RETRY_DELAY=3
attempt=1
build_ok=0

while [ $attempt -le "$RETRY_MAX" ]; do
    echo "Intento de build #$attempt..."
    if (cd src && npm run build); then
        build_ok=1
        echo "Build exitoso."
        break
    fi
    if [ $attempt -eq "$RETRY_MAX" ]; then
        echo "CRITICAL: Fallo de build persistente tras $RETRY_MAX intentos."
        DIAG_DIR="docs/diagnostics/${BRANCH//\//-}"
        mkdir -p "$DIAG_DIR"
        (cd src && npm run build) > "$DIAG_DIR/build_error_final.log" 2>&1 || true
        log_entry "FAILED" "Fallo build persistente; ver $DIAG_DIR/build_error_final.log"
        exit 1
    fi
    echo "Reintentando en ${RETRY_DELAY}s..."
    sleep "$RETRY_DELAY"
    attempt=$((attempt + 1))
done

# --- Certificacion documentacion de rama ---
if [ "$BRANCH" != "master" ] && [ "$BRANCH" != "main" ] && [ -n "$BRANCH" ]; then
    slug=$(echo "$BRANCH" | sed 's/[\/\\]/-/g')
    passport="docs/branches/${slug}.md"
    objective_doc="docs/branches/${slug}/OBJETIVO.md"

    clean_slug=$(echo "$slug" | sed -E 's/-[0-9]+$//')
    clean_passport="docs/branches/${clean_slug}.md"
    clean_objective_doc="docs/branches/${clean_slug}/OBJETIVO.md"

    if [ -f "$passport" ] || [ -f "$objective_doc" ]; then
        echo "Documentacion de rama encontrada (Exacta): $passport o $objective_doc"
    elif [ -f "$clean_passport" ] || [ -f "$clean_objective_doc" ]; then
        echo "Documentacion de rama encontrada (Limpia): $clean_passport o $clean_objective_doc"
    else
        echo "ERROR: No se encuentra documentacion de rama."
        echo "Esperado (Exacto): $passport o $objective_doc"
        echo "Esperado (Limpio): $clean_passport o $clean_objective_doc"
        log_entry "BLOCKED" "Documentacion de rama ausente ($slug)"
        exit 1
    fi
fi

# --- Suite completa de tests ---
echo "[SKILL] Ejecutando SUITE COMPLETA de Tests..."
if (cd src && npm run test); then
    log_entry "SUCCESS" "Suite Completa validada"
    echo "PR Skill Verificado."
    exit 0
else
    log_entry "FAILED" "Fallo en Suite Completa de Tests"
    echo "Tests fallidos. Push/PR rechazado."
    exit 1
fi
