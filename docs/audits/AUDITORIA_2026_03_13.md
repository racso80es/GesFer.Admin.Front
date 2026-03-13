# AUDITORÍA 2026_03_13

## 1. Métricas de Salud (0-100%)
Arquitectura: 90% | Nomenclatura: 95% | Estabilidad Async: 85%

## 2. Pain Points (🔴 Críticos / 🟡 Medios)
Hallazgo: Tests E2E y de configuración fallando en Jest debido a que se están ejecutando pruebas de Playwright con el runner de Jest que causan TypeError por no coincidir el entorno.
Ubicación: `src/tests/admin-e2e-mocked.spec.ts`, `src/tests/example.spec.ts` y falta de tests válidos en `src/lib/config.test.ts`.
Severidad: 🔴 Crítico

Hallazgo: Advertencias de Accesibilidad (A11y) en componentes UI en los roles `combobox` y `option` requeridos por ARIA.
Ubicación: `src/components/ui/select.tsx` (Líneas 76 y 141)
Severidad: 🟡 Medio

## 3. Acciones Kaizen (Hoja de Ruta para el Executor)
**Acción 1 (Corrección y exclusión de tests E2E del runner de Jest)**
*Instrucciones:* Añadir un test válido mínimo a `src/lib/config.test.ts` para que Jest no falle por archivo sin tests. Excluir la carpeta `tests/` que contiene las pruebas E2E de Playwright en `src/jest.config.js` agregando `!**/tests/**/*.spec.[jt]s?(x)` a `testMatch`.
*DoD (Definition of Done):* Ejecución de `npm run test` arroja 100% PASS sin eliminar los archivos.

**Acción 2 (Corrección A11y Select Dinámica)**
*Instrucciones:* Añadir propiedades ARIA faltantes en `src/components/ui/select.tsx` en `SelectTrigger` y `SelectItem` usando IDs generados dinámicamente con `React.useId()` en lugar de IDs hardcodeados.
*Fragmentos de código:*
```tsx
const Select = (...) => {
  const selectId = React.useId();
  // ...
  return (
    <SelectContext.Provider value={{ ..., selectId }}>
      <div className="relative" id={selectId}>{children}</div>
    </SelectContext.Provider>
  );
};
// En SelectTrigger (Línea 76)
<button
  role="combobox"
  aria-controls={`${ctx.selectId}-content`}
  aria-expanded={ctx.open}
  // ...
```
```tsx
// En SelectContent
<div id={`${ctx.selectId}-content`} ...>
// ...
```
*DoD (Definition of Done):* Ejecución de `npm run lint` no arroja advertencias para `select.tsx` y no se usa deuda técnica.
