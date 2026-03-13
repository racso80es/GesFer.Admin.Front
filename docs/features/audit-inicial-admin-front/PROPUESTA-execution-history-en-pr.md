# Propuesta: Incluir execution_history.json en los PR

> **Problema recurrente:** `docs/diagnostics/{branch}/execution_history.json` queda fuera del PR porque se genera **después** del commit y nunca se incluye en `git add`.

---

## 1. Análisis

### Flujo actual (invoke_commit.rs)

```
1. git add <files>     ← solo los archivos explícitos (--files) o -A (--all)
2. git commit -m "..." 
3. log_execution()     ← escribe execution_history.json DESPUÉS del commit
```

**Consecuencia:** `execution_history.json` se crea/actualiza tras el commit → queda como untracked → no entra en el PR.

### Dependencias

- **invoke-commit** y **invoke-command** escriben en `docs/diagnostics/{branch}/execution_history.json`
- **Generate-InteractionsReport.ps1** lee desde ese fichero para reportes de auditoría
- **auditoria-interacciones** (pre-commit): usa execution_history como fuente

---

## 2. Opciones evaluadas

| Opción | Descripción | Pros | Contras |
|--------|-------------|------|---------|
| **A) git commit --amend** | Tras commit, escribir log, add execution_history, amend | Un solo commit; trazabilidad completa | Requiere modificar invoke_commit.rs |
| **B) Segundo commit** | Tras commit principal, commit adicional solo con execution_history | Implementación simple | Dos commits por acción; ruido en historial |
| **C) gitignore** | Añadir `docs/diagnostics/` a .gitignore | Sin archivos untracked | Pierde trazabilidad en repo |
| **D) Incluir en --files por defecto** | Documentar que el usuario debe añadir execution_history manualmente | Sin cambios en código | Propenso a olvidos; no resuelve el problema |

---

## 3. Propuesta recomendada: Opción A (amend)

### Cambio en invoke_commit.rs

Tras el commit exitoso:

1. Escribir `log_execution()` (como ahora)
2. `git add docs/diagnostics/{branch}/execution_history.json`
3. `git commit --amend --no-edit`

**Resultado:** El commit final incluye tanto los archivos del usuario como el `execution_history.json` actualizado. Un solo commit, trazabilidad completa.

### Casos especiales

- **Commit fallido:** No se hace amend; el log se escribe con Status: "Failed" (para diagnóstico local).
- **--all:** Con `git add -A`, si execution_history ya existía y fue modificado, estaría incluido. Pero se crea después del add, por eso el amend es necesario en todos los casos.

### Alternativa ligera (sin amend)

Si se prefiere no usar amend:

- Escribir el log **antes** de `git add`
- Incluir `docs/diagnostics/{branch}/execution_history.json` en la lista de archivos a añadir
- **Problema:** En el momento del add aún no conocemos el resultado del commit (éxito/fallo, output). Habría que escribir un log "preliminar" y no reflejaría el resultado real.

Por tanto, **amend** es la opción más coherente con el flujo actual.

---

## 4. Implementación

1. Modificar `scripts/skills-rs/src/bin/invoke_commit.rs`: tras `log_execution()` exitoso, ejecutar `git add` del path del log y `git commit --amend --no-edit`.
2. Actualizar `SddIA/skills/invoke-commit/spec.md` con el nuevo comportamiento.
3. Recompilar: `cargo build --release` y copiar el .exe a la cápsula.

---

## 5. Criterio de aceptación

- Tras cada `invoke-commit` exitoso, `execution_history.json` queda incluido en el mismo commit.
- `git status` tras el commit no muestra `docs/diagnostics/` como untracked.
- Los PR incluyen el historial de ejecución de la rama.
