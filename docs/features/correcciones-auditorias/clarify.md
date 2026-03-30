# Clarifications

1. **`company-form.tsx`:** Los arrays estáticos de idiomas referidos en la auditoría ya se encuentran a nivel de módulo, no se reinstancian en la función del componente de react `CompanyForm`. La aclaración asume que el refactor original pudo hacerse parcialmente por lo que se verificará solamente.
2. **`jest.config.js`:** La colisión descrita sobre `haste module map` fue pre-evaluada y el fichero ya contaba con `<rootDir>/.next/` ignorado. Se salteará el proceso asumiendo resuelto en fix previo.