# Kaizen: Remove fs/path from config.ts

**Objetivo:** Eliminar dependencias de Node.js (`fs`, `path`) en `src/lib/config.ts` para cumplir con las directivas de arquitectura Edge Runtime.

**Contexto:** Auditoría técnica `AUDITORIA_2026_03_21.md` detectó uso de fs y path en código isomórfico, causando inestabilidades en Next.js.
