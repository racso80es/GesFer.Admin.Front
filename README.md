# GesFer Admin Frontend

Frontend administrativo para GesFer, desarrollado con Next.js 14 (App Router), TypeScript y Tailwind CSS. Opera como un proyecto standalone extraído del monorepo, consumiendo la API de Admin como un servicio externo.

## Arquitectura

El proyecto está diseñado bajo una arquitectura limpia adaptada para Next.js App Router, implementando el patrón SddIA (SISTEMA MULTI-AGENTE GESFER) documentado en el directorio `/SddIA/`. Todas las reglas de negocio, características, auditorías, herramientas y patrones están centralizados de manera uniforme y testable.

### Estructura Principal
- `src/app/`: Rutas y páginas de la aplicación utilizando el enrutador de Next.js (App Router).
- `src/components/`: Componentes de UI, subdivididos en `ui/` (Primitivos como Button, Input) y `shared/` (Lógica compartida).
- `src/lib/`: Utilidades, helpers y configuraciones.
- `docs/`: Documentación del proyecto y rastreo de funcionalidades (SSOT).
- `SddIA/`: Definiciones y procesos del Sistema Multi-Agente.

## Configuración y Entorno

Para ejecutar la aplicación localmente, primero se deben configurar las variables de entorno. Es necesario crear un archivo `.env` dentro de `src/` basado en la configuración esperada:

- `ADMIN_API_URL`: URL de la API Admin (requerida).
- `NEXT_PUBLIC_ADMIN_API_URL`: Alternativa pública para Client Components (requerida).
- `NEXTAUTH_URL`: URL base de la aplicación para la autenticación (requerida).
- `AUTH_SECRET`: Secret hash para firmar los tokens de NextAuth (requerido).
- `NEXT_PUBLIC_CLIENT_URL`: URL pública del cliente frontend.

## Desarrollo

Para ejecutar el proyecto, debes navegar primero al directorio `src/` y luego instalar las dependencias:

`cd src`
`npm install`
`npm run dev`

La aplicación estará disponible en `http://localhost:3001` (o el puerto configurado).

### Testing y Calidad de Código
- `npm run test`: Ejecuta la suite de pruebas con Jest y Playwright.
- `npm run lint`: Ejecuta ESLint para asegurar el cumplimiento del estilo.
- `npm run build`: Genera el build de producción standalone de Next.js.
- `npx tsc --noEmit`: Verifica la integridad de los tipos de TypeScript.

*Nota:* Durante un build de producción `output: standalone`, iniciar la aplicación con `node .next/standalone/server.js` desde el directorio adecuado.
