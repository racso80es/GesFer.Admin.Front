# Épica: Migración a Next.js 15
**Estado:** Pendiente / Teórico
**Prioridad:** Alta (pero postergada por estabilidad estructural)

**Análisis Estratégico:**
Durante la ejecución de Kaizen `2026_05_02_Npm_Audit`, se mitigaron vulnerabilidades en dependencias anidadas pero quedaron 3 vulnerabilidades (Severidad Alta) irresolubles en la rama de `next@14.x` sin efectuar un salto a `next@15.x`. Estas fallas son:
- Next.js HTTP request deserialization DoS
- Next.js: Unbounded next/image disk cache growth
- Next.js has a Denial of Service with Server Components

**Acción Requerida:**
Se encapsula esta Deuda Estratégica en este documento. Para resolver estas vulnerabilidades definitivamente, es necesario orquestar una migración mayor a Next.js 15, evaluando "breaking changes", incompatibilidades, configuraciones deprecadas de Server Components, Edge runtime, etc. Esta tarea debe ejecutarse en aislamiento y someterse a estrictas pruebas (Vía del Yunque) antes de aplicarse, en lugar de forzarla bajo una acción Kaizen de auditoría rutinaria.