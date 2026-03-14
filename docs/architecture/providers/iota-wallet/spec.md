# Especificación: Proveedor IOTA Wallet

**providerId:** `iota-wallet`
**Tipo:** Proveedor de billetera (wallet) para implementaciones futuras.
**Fuente:** Especificaciones y arquitectura IOTA Wallet (febrero 2026).

## Objetivo

Documentar las especificaciones técnicas del proveedor **IOTA Wallet** como referencia para futuras implementaciones de integración con billeteras en el ecosistema GesFer. Este documento sirve de soporte para decisiones de arquitectura, auditorías y desarrollo de features que requieran conectividad con dApps o autenticación basada en wallet.

## Información general

| Campo | Valor |
|-------|-------|
| **Nombre** | IOTA Wallet |
| **Tipo** | Open-source self-custody wallet |
| **Plataforma** | Extensión de Chrome |
| **Versión** | 1.5.5 (7db43a8) |
| **Última actualización** | 23 de febrero de 2026 |
| **Tamaño paquete** | 10.47 MiB |
| **Usuarios activos** | ~30 000 |

## Desarrollador

| Campo | Valor |
|-------|-------|
| **Organización** | IOTA Ecosystem DLT Foundation |
| **Dirección** | Pappelallee 78, Berlín 10437, Alemania |
| **Contacto** | info@iota.org |

## Características técnicas (relevantes para integración)

1. **Interacción con dApps:** Conexión segura a aplicaciones descentralizadas, aprobación de transacciones con transparencia y gestión de permisos.
2. **Gestión de cuentas:** Creación o importación segura mediante mnemotécnicos (mnemonics), claves privadas y semillas (seeds).
3. **Integración de hardware:** Soporte e integración con Ledger para mayor seguridad.
4. **Explorador de red:** Visualización de actividades y acceso a información detallada de transacciones vía IOTA Explorer.

## Privacidad y manejo de datos

- **Datos recopilados:** Información de autenticación, actividad del usuario.
- **Políticas:** El desarrollador declara que los datos no se venden a terceros, no se usan para fines ajenos a la funcionalidad principal y no se utilizan para determinar solvencia crediticia.

## Consideraciones para implementación futura

- **Plataforma:** Extensión Chrome — la integración frontend debe contemplar el flujo de conexión vía extensión.
- **Seguridad:** Soporte Ledger disponible; evaluar flujos de firma para operaciones sensibles.
- **Compatibilidad:** Verificar versiones de la API/extensiones IOTA al integrar.

## Referencias

- paths.auditsPath: docs/audits/
- paths.toolsDefinitionPath: SddIA/tools/
- Tool audit-funcional-frontend: SddIA/tools/audit-funcional-frontend/
