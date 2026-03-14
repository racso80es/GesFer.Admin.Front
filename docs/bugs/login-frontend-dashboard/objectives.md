# Fix: Login frontend → acceso a dashboard

**fix_id:** login-frontend-dashboard  
**Rama:** fix/login-frontend-dashboard  
**Persist:** paths.fixPath/login-frontend-dashboard (Cúmulo)

## Objetivo

Corregir la funcionalidad de login para que, tras introducir credenciales válidas (admin/admin123), el usuario sea redirigido correctamente a `/dashboard`.

## Pasos de reproducción

1. API Admin activa en puerto 5011 (o 5010).
2. Frontend en http://localhost:3001.
3. Ir a `/login`.
4. Introducir usuario `admin` y contraseña `admin123`.
5. Pulsar "Acceder al Panel Administrativo".

**Comportamiento actual:** La página permanece en `/login`; no hay redirect a `/dashboard`.

**Comportamiento esperado:** Redirect a `/dashboard` con sesión activa.

## Causa raíz (dos factores)

### 1. Nombres de propiedades (PascalCase)
El frontend enviaba `usuario`/`contraseña` (camelCase). La API espera `Usuario`/`Contraseña` (PascalCase) según contrato GesFer.Admin.Back.

### 2. URL en desarrollo (HTTPS → HTTP 5010)
El frontend usaba `https://localhost:5011`. En Node, fetch a HTTPS localhost falla por certificado autofirmado. El backend expone `http://localhost:5010` (perfil por defecto); usar HTTP 5010 evita el rechazo.

## Alcance del fix

- `src/auth.ts`: (1) Usar `Usuario` y `Contraseña` en el body; (2) En desarrollo con localhost, usar `http://localhost:5010` para el login.
- Alcance mínimo: solo causa raíz; sin refactor adicional.
