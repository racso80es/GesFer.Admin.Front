---
skill_id: sddia-evolution-register
kind: skill
implementation: rust
capsule: paths.skillCapsules.sddia-evolution-register
---

# Skill: sddia-evolution-register

## Propósito

Registrar cambios normativos bajo `./SddIA/` con UUID v4, actualizar `Evolution_log.md` y escribir `{uuid}.md` según contrato v1.1.

## Request JSON (stdin)

Envolver opcionalmente en `{ "request": { ... } }`.

| Campo | Obligatorio | Descripción |
| :--- | :---: | :--- |
| `autor` | sí | Autor del cambio |
| `proyecto_origen_cambio` | sí | Origen / contexto del proyecto |
| `contexto` | sí | Contexto de la intervención |
| `descripcion_breve` | sí | Una línea |
| `tipo_operacion` | sí | `alta` \| `baja` \| `modificacion` |
| `cambios_realizados` | sí | Lista `{ "anterior", "nuevo" }` |
| `impacto` | sí | `Bajo` \| `Medio` \| `Alto` |
| `replicacion_instrucciones` | no | Texto para réplica en otro entorno |
| `rutas_eliminadas` | no | Solo baja |
| `commit_referencia_previo` | no | Solo baja |

## Entrada UTF-8 (Windows)

En PowerShell, el pipe a un `.exe` puede corromper acentos; usar por ejemplo:

`cmd /c "chcp 65001>nul && type payload.json | sddia_evolution_register.exe"`

## Salida

JSON `{ "success", "id_cambio", "detail_path", "hash_integridad" }` o error.

## Binarios hermanos

- `sddia_evolution_validate` — valida diff git (`--base` / `--head`).
- `sddia_evolution_watch` — observa `./SddIA/` (debounce).
