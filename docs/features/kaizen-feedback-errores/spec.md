---
title: Kaizen Feedback Errores
type: feature
status: active
---

# Especificación Técnica: Feedback Errores en Formularios de Organización

## Resumen Arquitectónico
Se requiere modificar la capa de visualización (componentes cliente de Next.js) en los formularios de creación y edición de organizaciones para gestionar un estado de error local. Cuando ocurra una excepción en la petición HTTP (fetch) a la API interna, este estado deberá actualizarse para mostrar un mensaje de error renderizado dinámicamente sobre el formulario.

## Cambios Propuestos

### Archivo 1: `src/app/companies/new/page.tsx`
- **Modificación:** Introducir el hook `useState` de React para gestionar un estado `error`.
- **Implementación:**
  ```tsx
  const [error, setError] = useState<string | null>(null);
  ```
- **Manejo de Error:** En el bloque `catch` de `handleSubmit`, actualizar este estado con un tipo de comprobación explícita (type guard) para `Error`:
  ```tsx
  setError(error instanceof Error ? error.message : "Error al crear la organización");
  ```
- **Visualización:** Añadir un renderizado condicional en la interfaz, por encima de `CompanyForm`, similar a los bloques de error de Tailwind CSS ya utilizados en el proyecto:
  ```tsx
  {error && (
    <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-4 text-red-800 text-sm">
      {error}
    </div>
  )}
  ```

### Archivo 2: `src/app/companies/[id]/edit/page.tsx`
- **Modificación:** Introducir el estado `submitError` en `EditCompanyPage`. (Se evita la colisión de nombres si ya hubiera alguna otra gestión de errores locales, aunque el archivo ya importa `useState`).
- **Implementación:**
  ```tsx
  const [submitError, setSubmitError] = useState<string | null>(null);
  ```
- **Manejo de Error:** Dentro del bloque `catch` de `handleSubmit`, actualizar la variable:
  ```tsx
  setSubmitError(error instanceof Error ? error.message : "Error al actualizar la organización");
  ```
- **Visualización:** Añadir un renderizado condicional análogo al de la creación:
  ```tsx
  {submitError && (
    <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-4 text-red-800 text-sm">
      {submitError}
    </div>
  )}
  ```

## Restricciones y Reglas
1. **Conservación del Logueo:** No se debe eliminar el `console.error(error)` original para facilitar la depuración, pero se le acompañará de la actualización del estado UI.
2. **Type Safety:** El uso del Type Guard `instanceof Error` es mandatorio en los bloques `catch` antes de invocar la propiedad `.message`.
3. **Consistencia Visual:** Utilizar las clases CSS basadas en Tailwind (`bg-red-50`, `border-red-200`, `text-red-800`, `text-sm`) que ya forman parte de la consistencia visual del administrador.
