---
contract_ref: paths.processPath/process-contract.json
input_ref: docs/audits/AUDITORIA_2026_04_05.md
name: Corrección de manejo de errores
persist_ref: docs/features/correccion-auditorias
phases:
  - description: Implementar guarda de tipo para los catch en src/app/companies/new/page.tsx y src/app/companies/[id]/edit/page.tsx.
    id: '0'
    name: Implementación
  - description: Validar compilación, tests y build.
    id: '1'
    name: Validación
principles_ref: SddIA/principles
process_id: correccion-auditorias
related_actions:
  - implementation
  - validate
related_skills:
  - documentation
spec_version: 1.0.0
---

# Corrección de manejo de errores

## Especificación

Se deben aplicar guardas de tipo a todas las instancias en las que se imprime el `error` directamente sin verificar su tipo.

**Específicamente:**
En `src/app/companies/new/page.tsx` y `src/app/companies/[id]/edit/page.tsx`:
Cambiar:
```typescript
catch (error) {
  console.error(error);
}
```
A:
```typescript
catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
}
```
