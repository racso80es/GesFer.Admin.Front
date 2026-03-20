# Auditoría S+ - Guardián de la Infraestructura

**Fecha:** 2026-03-20

## 1. Métricas de Salud (0-100%)
- **Arquitectura:** 95%
- **Nomenclatura:** 90%
- **Estabilidad Async:** 85%

## 2. Pain Points (🔴 Críticos / 🟡 Medios)

**Hallazgo 1: Manejo Inseguro de Excepciones (Type Safety en Catch Blocks)**
🟡 **Medio**
Descripción: En varios bloques `catch`, el objeto `error` (que TypeScript infiere como `unknown`) es pasado directamente a `console.error` o a funciones que esperan `string` o `Error`, en lugar de verificar su tipo explícitamente y extraer un mensaje seguro. Esto vulnera el principio de resiliencia y auditabilidad, ya que el error logueado podría no ser serializable o legible.
Ubicación:
- `src/app/api/companies/[id]/route.ts` (Líneas 30, 49, 67)
- `src/app/api/companies/route.ts` (POST - Línea 39)
- `src/app/companies/new/page.tsx` (Línea 26)
- `src/app/companies/[id]/edit/page.tsx` (Líneas 29, 52)

**Hallazgo 2: Falta de Feedbacks Visuales por Errores en Formularios (UI)**
🟡 **Medio**
Descripción: En los archivos `src/app/companies/new/page.tsx` y `src/app/companies/[id]/edit/page.tsx`, el bloque `catch (error)` imprime el error en consola pero no provee feedback visual al usuario si falla la creación/edición, limitándose a comentarios de código `// Handle error (e.g., show toast)`. La falta de manejo afecta la mantenibilidad y la experiencia del usuario.
Ubicación:
- `src/app/companies/new/page.tsx` (Líneas 26-27)
- `src/app/companies/[id]/edit/page.tsx` (Líneas 52-53)

## 3. Acciones Kaizen (Hoja de Ruta para el Executor)

### Acción 1: Refactorizar bloques `catch` para Type Safety en API Routes
**Instrucciones exactas para el Executor:**
1. Modificar los bloques `catch (error)` en `src/app/api/companies/[id]/route.ts` y `src/app/api/companies/route.ts` (POST).
2. Extraer el mensaje usando un type guard: `const message = error instanceof Error ? error.message : String(error);`.
3. Usar `message` en `console.error` junto con el error original.

**Fragmento de código:**
```typescript
catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Error de la operación:`, message, error);
  return NextResponse.json(
    { error: "Error de la operación", detail: message },
    { status: 500 }
  );
}
```

**Definition of Done (DoD):** Ningún archivo en `src/app/api/companies` tiene bloques `catch` que hagan `console.error(error)` directamente sin un chequeo explícito de tipo de `Error`.

### Acción 2: Proveer manejo de estado de error visual en las páginas de formulario
**Instrucciones exactas para el Executor:**
1. Modificar `src/app/companies/new/page.tsx` y `src/app/companies/[id]/edit/page.tsx`.
2. Añadir un estado local `const [errorMsg, setErrorMsg] = useState<string | null>(null);`.
3. En el bloque `catch (error)`, setear el mensaje de error visual.
4. Renderizar el mensaje de error de forma clara (por ejemplo, con un `<div className="text-red-500 mb-4">{errorMsg}</div>`) antes del renderizado de `CompanyForm`.

**Fragmento de código:**
```typescript
const [errorMsg, setErrorMsg] = useState<string | null>(null);

// En handleSubmit
catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message, error);
  setErrorMsg(message);
}

// En el JSX
{errorMsg && <div className="text-red-500 mb-4 p-3 bg-red-100 rounded">{errorMsg}</div>}
```

**Definition of Done (DoD):** Los componentes de página de creación y edición de organizaciones exhiben mensajes de error visuales en la interfaz cuando el envío del formulario falla, y no tienen comentarios tipo "TODO" o "Handle error" residuales.
