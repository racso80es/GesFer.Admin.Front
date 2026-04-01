---
type: "validation"
feature: "correccion-auditoria-2026-04-01"
status: "pending"
---

# Criterios de Validación - Corrección de Auditoría 2026-04-01

-   [ ] **Criterio 1:** Ningún archivo en `src/app/` usa imports con `../` que apunten a `src/components/`. Verificado mediante: `grep -rn "import " app/ components/ | grep "\.\./"`
-   [ ] **Criterio 2:** Ningún archivo en `src/components/` usa imports con `../` cruzando hacia otros subdirectorios de `components/`. Verificado mediante: `grep -rn "import " app/ components/ | grep "\.\./"`
-   [ ] **Criterio 3:** El proyecto compila sin errores TypeScript (`cd src && npx tsc --noEmit`).
-   [ ] **Criterio 4:** El build de Next.js se completa exitosamente (`cd src && npm run build`).
-   [ ] **Criterio 5:** Las pruebas locales se ejecutan sin regresiones (`cd src && npm run test`).
