---
version: 1.0.0
name: correccion-auditorias-ui
description: Especificación para la corrección de atributos ARIA en el componente Select
---

# Especificación Técnica

## Correcciones
- Archivo: `src/components/ui/select.tsx`
- En el componente `SelectTrigger` (rol `combobox`), se añadirá el atributo `aria-controls="select-content"`.
- En el componente `SelectItem` (rol `option`), se añadirá el atributo `aria-selected={ctx.value === value}`.

## Impacto
- No se introducen cambios visuales o funcionales a los componentes.
- Mejora la accesibilidad y el soporte a lectores de pantalla.
- Resuelve warnings de ESLint durante el build.
