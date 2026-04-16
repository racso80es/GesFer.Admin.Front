# Clarificación de Especificaciones (Kaizen)

- El objetivo es unicamente la refactorización de manejo de errores, sin alterar la lógica de las llamadas de API ni sus respuestas `NextResponse.json`.
- La regla se aplica consistentemente a todas las operaciones en esos controladores para evitar fugas del tipo `unknown`.
