---
contract_ref: paths.processPath/process-contract.json
name: Corrección de Auditoría 2026-03-17
process_id: correccion-auditorias
spec_version: 1.0.0
---
# Especificación: Corrección de Auditoría 2026-03-17

## 1. Alcance
- Modificar las rutas API para desactivar el pre-rendering estático durante el proceso de build en Next.js App Router, evitando así los errores de uso de funciones dinámicas (`DYNAMIC_SERVER_USAGE`).

## 2. Componentes Afectados
1. `src/app/api/admin/dashboard/summary/route.ts`
2. `src/app/api/companies/route.ts`
3. `src/app/api/companies/[id]/route.ts`

## 3. Descripción de la Solución
Agregar el flag `export const dynamic = "force-dynamic";` a cada uno de los archivos mencionados. Next.js 14 interpretará esto como una orden de evaluar estas rutas bajo demanda cada vez que reciban una petición y no intentará generar sus respuestas de forma estática durante el `npm run build`. Esta directiva es necesaria y la forma estándar de lidiar con funciones dinámicas en la capa de Route Handlers de App Router (por ejemplo: cookies, headers) para APIs.