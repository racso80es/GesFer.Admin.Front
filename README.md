# GesFer Admin Frontend (GesFer.Admin.Front)

Este repositorio contiene el Frontend administrativo para GesFer, desarrollado como una aplicación independiente con Next.js 14 (App Router), TypeScript, y Tailwind CSS. Utiliza Jest y Playwright para el testing.

Esta documentación es el Single Source of Truth (SSOT) del proyecto.

## 📂 Arquitectura y Estructura del Proyecto

El código fuente principal se encuentra dentro del directorio `src/`.

```
src/
 ├── app/                  # Rutas y páginas (Next.js 14 App Router)
 ├── components/           # Componentes React reutilizables
 │    ├── ui/              # Primitivos de interfaz (Button, Input, Card, Dialog, etc.)
 │    └── shared/          # Componentes con lógica compartida (e.g. DataTable)
 ├── lib/                  # Utilidades y helpers
```

### Otras Carpetas Clave

- `SddIA/`: Configuraciones, comportamientos y normas del Sistema Multi-Agente GesFer.
- `docs/`: Documentación del proyecto, registro de evolución, y tracking de features/tareas.
- `scripts/`: Scripts utilitarios.

## ⚙️ Configuración

### Variables de Entorno

Para ejecutar la aplicación localmente, se requiere un archivo `.env` dentro del directorio `src/` con las siguientes variables:

- `ADMIN_API_URL`: URL de la API Admin (requerida; la aplicación consume esta API como un servicio HTTP externo).
- `NEXT_PUBLIC_ADMIN_API_URL`: Alternativa pública para Client Components.
- `NEXTAUTH_URL`: URL base de la aplicación.
- `AUTH_SECRET`: Secret utilizado para NextAuth.

*Nota:* Durante los procesos de build (`npm run build`) o CI, las validaciones estrictas de entorno se saltan utilizando valores de prueba definidos en `src/lib/env.ts` para permitir la generación estática.

### Alias de Importación

- **Frontend Import Integrity**: Todas las importaciones que cruzan límites lógicos deben usar el alias `@/` que apunta a `src/`. Por ejemplo: `@/components/...`. Está **estrictamente prohibido** el uso de referencias como `@shared/` o `../../Shared/`.

## 🚀 Desarrollo y Ejecución

**Importante:** Todos los comandos de instalación, desarrollo, construcción y testing deben ejecutarse **dentro del directorio `src/`**.

```bash
cd src
npm install
npm run dev
```

La aplicación estará disponible por defecto en `http://localhost:3001` (o el puerto configurado).

Otros comandos útiles (ejecutados en `src/`):
- `npm run build`: Compila la aplicación para producción.
- `npx tsc --noEmit`: Verifica la integridad estructural (tipos) sin compilar.
- `npm run lint`: Ejecuta el linter.

### Producción (Standalone)

El proyecto utiliza la configuración `output: 'standalone'` de Next.js.
Para iniciar una build de producción localmente:

```bash
cd src
node .next/standalone/server.js
```

Asegúrese de proporcionar las variables de entorno necesarias (como `AUTH_SECRET` y `AUTH_TRUST_HOST`) al ejecutar el servidor standalone.

## 🧪 Testing y Convenciones

El proyecto adopta estrictamente el patrón **"Testability, Audit & Judge"**. Todo código debe ser testable y auditable; no se permiten atajos ni deuda técnica.

- **Jest:** Configurado para pruebas unitarias. Los comandos se ejecutan con `npm run test` (en `src/`).
- **Playwright:** Configurado para pruebas end-to-end (E2E) y verificación de interfaz.
- **Manejo de Errores:** Se requiere el tipado estricto en TypeScript. Al usar bloques `catch (error)`, nunca se debe utilizar el objeto inferido `unknown` directamente ni registrarlo con console.log. Se debe extraer el mensaje usando guardias de tipo: `const message = error instanceof Error ? error.message : String(error);`.

## 🤖 Sistema Multi-Agente GesFer (SddIA)

Este repositorio implementa un sistema multi-agente personalizado documentado en la carpeta `SddIA/`.

- **Tracking de Features:** Toda nueva funcionalidad o corrección debe pasar por un proceso estructurado documentado en `docs/features/<feature-name>/`, incluyendo la creación obligatoria de `objectives.md`, `spec.md`, `spec.json`, `plan.md`, `clarify.md`, `implementation.md` y `validacion.md`.
- **Registro de Evolución:** Todas las modificaciones significativas deben registrarse en `docs/evolution/EVOLUTION_LOG.md`.
- **Pre-commit:** Se debe ejecutar una verificación y auditoría completa de los procesos antes de hacer merge o commit de grandes cambios.