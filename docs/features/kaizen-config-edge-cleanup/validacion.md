# Validación

1. Se verificó con `cat src/lib/config.ts` que la función se simplificó a únicamente retornar `getDefaultConfig(env)`.
2. Se corrió `npx tsc --noEmit` en `src/` sin arrojar errores de tipo.
3. Se verificará en los siguientes pasos (npm run test y npm run build) que las pruebas automatizadas y el proceso de construcción para Next.js en *edge* se completan sin fallos.
