---
status: "active"
---

# Implementation

- Se procedió a buscar el archivo `src/jest.config.js` para modificar la propiedad `modulePathIgnorePatterns` agregando la exclusión del directorio `<rootDir>/.next/`.
- Tras analizar el archivo, se determinó que la exclusión `<rootDir>/.next/` ya existía. Por tanto, no fue necesario realizar ninguna modificación en el código.
