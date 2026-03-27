# GesFer.Admin.Front

Frontend administrativo para el ecosistema **GesFer**, aislado como proyecto independiente. Este repositorio contiene una aplicación **Next.js 14 (App Router)** orientada a la gestión administrativa (backoffice) del negocio.

Originalmente extraído de la carpeta `src/Admin/Front/` del monorepo GesFer, este frontend ahora opera de forma autónoma (standalone) y consume la API de administración como servicio externo vía HTTP.

## Stack Tecnológico

- **Framework:** Next.js 14 (App Router), TypeScript 5.3
- **UI:** Tailwind CSS 3.4, Lucide React
- **Estado:** TanStack React Query 5, React Context
- **Formularios:** react-hook-form 7 + Zod
- **Autenticación:** NextAuth 5 (CredentialsProvider)
- **i18n:** next-intl
- **Testing:** Jest 29 + Testing Library + Playwright

## Estructura del Proyecto

El código fuente principal se encuentra en la carpeta `src/`:

- `src/app/`: Rutas y páginas (App Router)
- `src/components/`: Componentes React reutilizables
  - `src/components/ui/`: Primitivos de interfaz (Button, Input, Card, Dialog, etc.)
  - `src/components/shared/`: Componentes con lógica compartida (Button con testid, DataTable, etc.)
- `src/lib/`: Utilidades y helpers
- `SddIA/`: Sistema multi-agente e inteligencia artificial que gestiona la arquitectura y reglas de este proyecto.

> **Importante:** Este proyecto no depende de carpetas externas al repositorio (como `../../Shared/` o `@shared/`). Todos los recursos necesarios están autocontenidos.

## Configuración y Variables de Entorno

Para ejecutar la aplicación localmente, debes configurar las siguientes variables de entorno. Renombra o copia el archivo `src/.env.example` a `src/.env` y establece los valores correctos:

- `ADMIN_API_URL`: URL de la API Admin (requerida; ej. `http://localhost:5000/api`)
- `NEXT_PUBLIC_ADMIN_API_URL`: Alternativa pública para Client Components
- `NEXTAUTH_URL`: URL base de la aplicación local (ej. `http://localhost:3001`)
- `AUTH_SECRET`: Secret aleatorio para la encriptación de sesión en NextAuth (requerido)

## Desarrollo

1. Navega al directorio de código fuente:
   ```bash
   cd src
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

La aplicación estará disponible por defecto en `http://localhost:3001` (o el puerto configurado).

### Alias de Importación

Para asegurar la integridad de importación, todas las importaciones que crucen límites lógicos deben utilizar el alias de raíz en `src`:

- `@/*` : Apunta a la carpeta `src/` (ej. `import { Button } from "@/components/ui/button"`)

## Testing y Calidad

El proyecto incluye scripts de validación que deben pasar antes de proponer cambios:

- `npm run test`: Ejecuta los tests unitarios y de componentes con Jest.
- `npm run lint`: Ejecuta ESLint para analizar el código fuente.
- `npm run build`: Compila la aplicación para producción.
- `npx tsc --noEmit`: Verifica la integridad de tipos de TypeScript.

> Todo el código introducido debe ser testable y auditable siguiendo las directrices del Sistema Multi-Agente (SddIA).

## SddIA (Sistema Multi-Agente)

Este proyecto está gobernado por un conjunto de reglas, normas y agentes de IA definidos en el directorio `SddIA/`. Antes de contribuir, debes familiarizarte con las [Leyes Universales y el Protocolo Maestro](AGENTS.md) del proyecto. El desarrollo se realiza bajo el modelo *System Driven Design* (SDD).
