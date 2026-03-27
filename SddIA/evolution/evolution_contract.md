# Contrato de cambio — SddIA Evolution (v1.1)

**Versión del contrato:** `1.1`  
**Fuente de rutas:** Cúmulo → `paths.sddiaEvolutionPath`, `paths.sddiaEvolutionLogFile`, `paths.sddiaEvolutionContractFile`.

## Propósito

Cada intervención que altere artefactos bajo `./SddIA/` (salvo acuerdos explícitos en la norma) debe quedar registrada con un **detalle atómico** (`{id_cambio}.md`) y reflejo en el **índice** (`Evolution_log.md`).

## Identificador

- **`id_cambio`:** UUID v4 en string canónico (minúsculas, con guiones).
- **Nombre de fichero:** `{id_cambio}.md` en `paths.sddiaEvolutionPath`.
- El formato legado `SSDD-LOG-YYYYMMDD-HHMM` **no** es el identificador machine-readable principal.

## Frontmatter obligatorio (detalle atómico)

| Campo | Tipo / valores |
| :--- | :--- |
| `contrato_version` | `1.1` |
| `id_cambio` | UUID v4 |
| `fecha` | ISO 8601 (fecha u fecha-hora) |
| `autor` | string |
| `proyecto_origen_cambio` | string |
| `contexto` | string |
| `descripcion_breve` | string |
| `tipo_operacion` | `alta` \| `baja` \| `modificacion` |
| `cambios_realizados` | lista de `{ anterior, nuevo }` |
| `impacto` | `Bajo` \| `Medio` \| `Alto` |
| `replicacion.instrucciones` | string |
| `replicacion.hash_integridad` | SHA-256 en hex minúsculas del YAML canónico del frontmatter, o `SHA-256-PENDIENTE` |

## Frontmatter condicional (baja)

| Campo | Cuándo |
| :--- | :--- |
| `rutas_eliminadas` | Lista de strings cuando `tipo_operacion: baja` |
| `commit_referencia_previo` | SHA corto, URL o trazabilidad al último commit donde existía lo retirado |

## Hash de integridad

El SHA-256 se calcula sobre el **bloque YAML del frontmatter** en forma **canónica**: claves en orden lexicográfico, serialización estable (sin comentarios). La definición exacta coincide con la implementación en `sddia_evolution_register` (binario en `paths.skillsRustPath`).

## Índice `Evolution_log.md`

Tabla recomendada: **ID (GUID)** | **Fecha** | **Descripción breve**.
