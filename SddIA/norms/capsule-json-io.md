# Norma — E/S JSON en cápsulas (skills / tools)

**Ámbito:** binarios invocables desde **paths.skillCapsules** y **paths.toolCapsules** cuando el diseño exija **entrada y salida en JSON** (telemetría, registro evolution, orquestación por agentes).

**Fuente de rutas:** Cúmulo → `pathsContract` → `cumulo.paths.json`.

## Envelope mínimo

- **Entrada (stdin):** objeto JSON con `meta` (versión de contrato, identificador de skill/tool, correlación u origen) y `request` (payload específico del binario).
- **Salida exitosa (stdout):** objeto JSON con `meta` y `result`.
- **Salida de error:** objeto JSON con `meta` y `error` (código, mensaje, detalle opcional).

Los campos concretos por binario deben documentarse en **paths.skillsDefinitionPath** / **paths.toolsDefinitionPath** y alinearse con **SddIA/skills/skills-contract.md** y **SddIA/tools/tools-contract.md** (y sus `.json` asociados).

## Referencias

- Contrato de cápsula y manifest: `paths.skillsDefinitionPath/skills-contract.md`, `paths.toolsDefinitionPath/tools-contract.md`.
- Registro evolution: `SddIA/norms/sddia-evolution-sync.md`, `paths.sddiaEvolutionContractFile`.
