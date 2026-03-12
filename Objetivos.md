# Objetivos del proyecto GesFer.Admin.Front

## Descripción del contexto

Este repositorio corresponde al **frontend de administración** del ecosistema GesFer, aislado como proyecto independiente. Su código fuente fue extraído de la carpeta `src/Admin/Front/` del monorepo GesFer original, y su infraestructura IA (SddIA) fue adaptada desde el proyecto GesFer.Admin.Back.

En su estado actual, el proyecto es un **frontend Next.js 14 (App Router) standalone** que consume la API de administración como servicio externo vía HTTP.

## Stack tecnológico

- **Framework:** Next.js 14 (App Router), TypeScript 5.3
- **UI:** Tailwind CSS 3.4, Lucide React
- **Estado:** TanStack React Query 5, React Context
- **Formularios:** react-hook-form 7 + Zod
- **Autenticación:** NextAuth 5 (CredentialsProvider)
- **i18n:** next-intl
- **Testing:** Jest 29 + Testing Library + Playwright
- **Puerto desarrollo:** 3001

## Objetivos del proyecto (documentación viva)

1. **Mantener una única fuente de verdad**  
   La documentación en este repositorio debe referirse solo al contexto actual: frontend Admin aislado, sin asumir monorepo ni backend local.

2. **README y Objetivos al día**  
   El README debe describir qué es este proyecto, cómo ejecutarlo y cómo contribuir, sin referencias obsoletas a monorepos o componentes que ya no forman parte del repo.

3. **Claridad para nuevos desarrolladores**  
   Cualquier persona que clone el repo debe entender de inmediato que es el frontend de administración de GesFer y qué puede hacer con él (ejecutar, testear, desplegar).

4. **Alineación con el protocolo del proyecto**  
   Respetar las Leyes Universales y el protocolo multi-agente definidos en `AGENTS.md` (entorno Windows/PowerShell, sin commits a `master`, build verificado, etc.).

5. **Independencia total del monorepo**  
   No debe quedar ninguna dependencia, import ni configuración que asuma la existencia de carpetas externas (`../../Shared/`, `@shared/`, `src/Product/`, etc.).

---

*Este documento se actualizará cuando cambien los objetivos o el alcance del proyecto.*
