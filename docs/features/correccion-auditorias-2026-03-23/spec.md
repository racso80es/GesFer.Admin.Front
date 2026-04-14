---
contract_ref: paths.processPath/correccion-auditorias/spec.json
input_ref: paths.auditsPath/AUDITORIA_2026_03_23.md
name: Especificación Técnica de la Corrección Kaizen (2026-03-23)
---
# Especificación Técnica

## Componentes a Modificar
- `src/app/api/admin/dashboard/summary/route.ts`
- `src/app/api/companies/[id]/route.ts`
- `src/app/api/companies/route.ts`
- `src/app/companies/page.tsx`
- `src/components/companies/company-form.tsx`

## Plan de Implementación
1. **API Logs:**
   Para todos los catch blocks en las rutas de API, asegurarse de aplicar este tipo de refactorización:
   ```ts
   catch (error) {
     const message = error instanceof Error ? error.message : String(error);
     console.error("Log message:", message); // Eliminar , error de los logs existentes
     ...
   }
   ```

2. **Data Fetching:**
   Cambiar `src/app/companies/page.tsx` para no hacer `fetch` local. En lugar de:
   ```ts
   const res = await fetch(`${baseUrl}/api/companies`, { headers: { cookie } });
   ```
   Usar la clase `admin-api-server` ya existente:
   ```ts
   const api = getAdminApiWithToken(session.accessToken);
   const companies = await api.get<Company[]>("/company");
   ```

3. **React Performance:**
   Extraer los arreglos del render block en `src/components/companies/company-form.tsx`.
