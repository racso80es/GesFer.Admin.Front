---
version: 1.0.0
---

# Objetivos de Corrección de Auditoría 2026-04-13

## 1. Problema

El Auditor de Arquitectura ha detectado dos problemas en la aplicación GesFer Admin Frontend que violan las normativas de la base de código.

Primero, importaciones relativas que cruzan límites lógicos en `src/app/companies/new/page.tsx` y `src/app/companies/[id]/edit/page.tsx`, las cuales no utilizan el alias de ruta principal del proyecto `@/`.

Segundo, la captura de errores (`catch (error)`) pasaba objetos directos al log (p.ej., `console.error(error)`) en vez de cadenas seguras usando el guard de tipo `error instanceof Error ? error.message : String(error)`, en los archivos `src/app/companies/new/page.tsx`, `src/app/companies/[id]/edit/page.tsx`, `src/components/shared/DestructiveActionConfirm.tsx` y `src/app/companies/page.tsx`.

## 2. Objetivos

1. Reemplazar las importaciones relativas que apuntan a componentes por el alias `@/components/...` en `src/app/companies/new/page.tsx` y `src/app/companies/[id]/edit/page.tsx`.
2. Reemplazar todos los llamados a `console.error(error)` por llamados seguros tipo `const message = error instanceof Error ? error.message : String(error); console.error(message);` en los 4 archivos que fallan la auditoría.

## 3. Criterios de Cierre (DoD)

1. El código no contiene importaciones del tipo `../../../components/...` para cruzar límites de directorios en los archivos auditados.
2. Los bloques `catch (error)` en los archivos auditados extraen un string con el error de manera segura antes de registrarlo.
3. El proyecto compila limpiamente mediante `npm run build` y ejecuta tests (`npm run test`) sin regresiones.
