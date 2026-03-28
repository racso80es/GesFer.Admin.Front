# GesFer.Admin.Front

Frontend administrativo para GesFer, desarrollado con Next.js 14 (App Router), TypeScript y Tailwind CSS.

## Estructura

- `src/app/`: Rutas y páginas (App Router)
- `src/components/`: Componentes React reutilizables
- `src/lib/`: Utilidades y helpers
- `src/components/ui/`: Primitivos de interfaz (Button, Input, Card, Dialog, etc.)
- `src/components/shared/`: Componentes con lógica compartida (Button con testid, DataTable, etc.)

## Configuración

### Variables de Entorno

- `ADMIN_API_URL`: URL de la API Admin (requerida; ver .env.example)
- `NEXT_PUBLIC_ADMIN_API_URL`: Alternativa pública para Client Components
- `NEXTAUTH_URL`: URL de la aplicación (requerida)
- `AUTH_SECRET`: Secret para NextAuth (requerido)

### Alias de Importación

- `@/*`: Apunta a la carpeta `src/` del proyecto

## Desarrollo

Para ejecutar el proyecto, debes situarte en el directorio `src/`.

```bash
cd src
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3001` (o el puerto configurado).