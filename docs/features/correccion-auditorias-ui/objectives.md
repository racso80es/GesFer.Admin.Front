---
status: Open
priority: Medium
created_date: 2026-03-14
---

# Corrección según Auditorías: Atributos ARIA en Select UI

## Objetivos
- Resolver las advertencias de ESLint relacionadas con la falta de atributos ARIA requeridos en el componente `src/components/ui/select.tsx`.
- Mejorar la accesibilidad y mantenibilidad del componente Select.

## Hallazgos Consolidados
1. **[🟡 Medio]** Falta el atributo `aria-controls` en el elemento con rol `combobox` en `src/components/ui/select.tsx` (Línea 76).
2. **[🟡 Medio]** Falta el atributo `aria-selected` en el elemento con rol `option` en `src/components/ui/select.tsx` (Línea 141).

## Criterios de Cierre
- `npm run lint` en el directorio `src/` se ejecuta sin emitir advertencias sobre atributos ARIA (`aria-controls`, `aria-selected`).
- `npm run build` en el directorio `src/` finaliza correctamente sin errores.
- `npm run test` en el directorio `src/` pasa todas las pruebas.
