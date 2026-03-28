# Plan de Implementación: Kaizen Error Handling 2026-03-23

1. Modificar `src/app/api/companies/[id]/route.ts`:
   - En el `GET`:
     ```typescript
     catch (error) {
       const message = error instanceof Error ? error.message : String(error);
       console.error(`Error fetching company ${params.id}:`, message);
       ...
     }
     ```
   - En el `PUT`:
     ```typescript
     catch (error) {
       const message = error instanceof Error ? error.message : String(error);
       console.error(`Error updating company ${params.id}:`, message);
       ...
     }
     ```
   - En el `DELETE`:
     ```typescript
     catch (error) {
       const message = error instanceof Error ? error.message : String(error);
       console.error(`Error deleting company ${params.id}:`, message);
       ...
     }
     ```

2. Modificar `src/app/api/companies/route.ts`:
   - En el `POST` (el GET ya está correcto según auditoría y validaciones previas):
     ```typescript
     catch (error) {
       const message = error instanceof Error ? error.message : String(error);
       console.error("Error creating company:", message);
       ...
     }
     ```

3. Verificar TS y pasar pruebas para confirmar que la refactorización es segura.
