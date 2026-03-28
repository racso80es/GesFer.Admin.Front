# Clarify

The audit specifically notes that we shouldn't pass the `error` object inside `console.error` at the end:

> Uso de console.error pasando directamente el objeto error original junto al message extraído.
> Uso de console.error pasando el objeto de error original, o sin extraer un type guard en el endpoint de POST.

The `NextResponse` should return `{ error: "Error al obtener la organización" }` along with `{ detail: message }` if possible, though not strictly required, passing the `message` to `console.error` is the priority requirement.