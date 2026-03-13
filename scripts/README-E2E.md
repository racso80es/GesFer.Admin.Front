# Pruebas E2E en local (GesFer.Admin.Front)

Las pruebas E2E se ejecutan contra el **frontend Next.js** en local usando **Playwright**.

## Validación rápida

1. **Desde la raíz del repo**, instalar dependencias e iniciar el dev server:
   ```powershell
   cd src
   npm install
   npm run dev
   ```
   (Esperar a que muestre "Ready on http://localhost:3001".)

2. **En otra terminal**, ejecutar los tests E2E:
   ```powershell
   cd src
   npm run test:e2e
   ```

Si los tests E2E pasan, el frontend está validado en este entorno.

## Requisitos

- Windows 11, PowerShell 7+
- Node.js 20+
- Ejecutar desde la **raíz del repositorio**

## Automatización: `Run-E2ELocal.ps1`

Desde la raíz del repo:

```powershell
.\scripts\Run-E2ELocal.ps1
```

El script hace en orden:

1. **npm install** en `src/` (si no se omite).
2. **Comprueba** si el frontend responde en `http://localhost:3001`. Si no, intenta arrancarlo en background.
3. **Ejecuta** `npm run test:e2e` con Playwright.

### Parámetros

| Parámetro        | Descripción |
|------------------|-------------|
| `-SkipInstall`   | No ejecutar npm install (node_modules ya presentes). |
| `-SkipDevServer` | No arrancar el dev server; falla si localhost:3001 no responde. |
| `-BaseUrl`       | URL base del frontend (por defecto `http://localhost:3001`). |
| `-OnlyTests`     | Solo ejecutar los tests E2E (entorno ya listo). |

Ejemplos:

```powershell
# Entorno ya listo (dev server corriendo en 3001)
.\scripts\Run-E2ELocal.ps1 -OnlyTests

# Sin instalar dependencias
.\scripts\Run-E2ELocal.ps1 -SkipInstall
```

## Ejecutar solo los tests E2E (manual)

Si ya tienes el dev server en marcha:

```powershell
cd src
npm run test:e2e
```

Variables de entorno opcionales:

- `BASE_URL` — URL base del frontend (por defecto `http://localhost:3001`).

## Stack de testing

- **Framework E2E:** Playwright 1.57
- **Puerto desarrollo:** 3001
- **Configuración:** `src/playwright.config.ts`

Las herramientas de inicialización del entorno frontend están en `scripts/tools/` (paths.toolCapsules, Cúmulo).
