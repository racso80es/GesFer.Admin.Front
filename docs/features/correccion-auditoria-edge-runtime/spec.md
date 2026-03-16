---
karma2-token: "edge-runtime-fix-1"
---
# Especificación de Corrección - Módulo HTTPS Edge Runtime

Se ha determinado que `src/lib/api/server-fetch.ts` incluye un `await import("https")` que causa fallos de compatibilidad en el runtime *Edge* de Next.js, reportando:
"A Node.js module is loaded ('https' at line 62) which is not supported in the Edge Runtime."

## Plan de Intervención:
1. Evaluar `process.env.NEXT_RUNTIME === "edge"`.
2. Si estamos en edge, ejecutar la petición de forma estándar con fetch y omitir la opción de "rejectUnauthorized: false", previniendo que Next.js trace el módulo nativo.
3. El uso de `https` se requiere únicamente para bypass de certificados locales cuando no estamos en Edge y estamos en modo de desarrollo (`isDev`).
4. Como alternativa para evitar que Webpack intercepte el módulo, se puede hacer que la resolución del módulo requiera bypass adicional en el empaquetado del build, o validar contra `typeof window === 'undefined' && process.env.NEXT_RUNTIME !== 'edge'`.
5. Comprobar que el comando de compilación funciona correctamente después del cambio.