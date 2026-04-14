# Implementación

Al revisar el archivo `src/tsconfig.json`, se ha comprobado que el archivo `"jest.setup.js"` **ya se encontraba** debidamente listado en el arreglo `"include"`.

```json
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "jest.setup.js"
  ],
```

Por lo tanto, la acción se marca como implementada.