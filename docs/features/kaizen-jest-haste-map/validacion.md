# Validación

Se ejecutó `cd src && npm run test` y se validó lo siguiente:
1. No existe un warning de "*jest-haste-map: Haste module naming collision*".
2. Todas las suites y pruebas (12 pruebas en 3 test suites) pasan exitosamente.
3. El build de Next.js (`npm run build`) en conjunto con Jest coexisten sin afectar las pruebas.
