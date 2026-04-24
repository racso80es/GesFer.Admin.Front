Actúa como un **Principal Design Engineer**. Tu misión es refactorizar la interfaz del proyecto utilizando exclusivamente los estándares definidos en `https://github.com/VoltAgent/awesome-design-md`.

### Objetivo
Transformar el frontend actual en un sistema escalable de alta fidelidad visual, priorizando el "Grado S+" en cada componente.

### Instrucciones de Ejecución:
1. **Ingesta de Estándares:** Analiza la estructura de componentes, tipografía y sistema de espaciado del repositorio 'awesome-design-md'. Úsalo como tu "Single Source of Truth".
2. **Arquitectura Atómica:** Implementa los componentes siguiendo el modelo de Átomos, Moléculas y Organismos. Cada componente debe ser puro, reutilizable y estar desacoplado de la lógica de negocio.
3. **Escalabilidad y Calidad:** - Utiliza CSS-in-JS o módulos CSS que respeten los Design Tokens de la fuente.
   - Asegura que todos los componentes sean accesibles (A11y) y responsivos.
   - Elimina cualquier estilo "hard-coded" o rastro de CSS legacy.
4. **Refactorización de las pantallas:**
   - Aplica estos estándares específicamente a todas las vistas.
   - Asegura coherencia visual absoluta entre el formulario de edición y la vista de consulta.

### Salida Esperada:
- Estructura de carpetas bajo `/src/components` alineada con el sistema de diseño.
- Definición de los Design Tokens (Colores, Spacing, Typography).
- Código de 2 componentes clave (ej. `Button`, `Card` o `Input`) como prueba de concepto del nuevo estándar.
