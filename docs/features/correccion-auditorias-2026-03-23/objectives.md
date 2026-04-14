# Objetivos: Corrección según Auditorías 2026-03-23

## Propósito
Abordar y solucionar los Pain Points detectados en la auditoría del 2026-03-23.

## Hallazgos Consolidados y Prioridades
1. **[CRÍTICO]** Error handling deficiente (`console.error` logs destructivos usando tipado estricto `unknown` violando directrices) en:
   - `src/app/api/admin/dashboard/summary/route.ts`
   - `src/app/api/companies/[id]/route.ts`
   - `src/app/api/companies/route.ts`
2. **[MEDIO]** Acoplamiento de lógica asíncrona inestable: Uso de `fetch` local para invocar APIs de NextAuth requiriendo pasar cookies en `src/app/companies/page.tsx`.
3. **[MEDIO]** Re-instanciación innecesaria de objetos (`languageOptions`, `languageNames`) en cada renderizado dentro de `src/components/companies/company-form.tsx`.

## Criterios de Cierre (DoD)
- [ ] Todo `catch(error)` debe extraer un string tipado (`error instanceof Error`) y JAMÁS loguear la variable `error` final directamente.
- [ ] La vista de `companies/page.tsx` debe cargar las organizaciones usando el servicio proxy `getAdminApiWithToken` y evitar el route handler intermediario local de Next.js.
- [ ] Los mapas de idiomas en `company-form.tsx` deben abstraerse en el top-level scope del componente para no re-construirse y seguir limpios.
- [ ] Compilación TypeScript sin errores.
- [ ] Tests pasando.