/**
 * Utilidad centralizada para el manejo de logs y saneamiento de datos sensibles.
 */

// Regex para detectar JWTs (Header.Payload.Signature) - Versión simplificada para base64url
const JWT_REGEX = /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g;

// Regex para detectar formato Bearer token genérico
const BEARER_REGEX = /Bearer\s+[A-Za-z0-9\-._~+/]+=*/gi;

// Regex para detectar emails
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Regex para detectar DNI/NIE español
const DNI_NIE_REGEX = /\b([X-Z])?\d{7,8}[A-Z]\b/gi;

// Regex para detectar tarjetas de crédito (14-16 dígitos con o sin guiones/espacios)
const CREDIT_CARD_REGEX = /\b(?:\d[ -]*?){13,16}\b/g;

// Regex para detectar asignaciones comunes de credenciales o secretos en JSON o strings
// Ejemplos: "password": "...", secret="...", apiKey: '...'
// Aseguramos que el valor no es ya algo que ha sido redactado
const CREDENTIALS_REGEX = /(?:password|secret|apiKey|api_key|token)["'\s]*[:=]["'\s]*([^"'\s,]+)/gi;

/**
 * Sanitiza un mensaje de log redactando información sensible como tokens,
 * credenciales y PII (emails, DNI, tarjetas de crédito).
 *
 * @param message El mensaje de log original (string).
 * @returns El mensaje de log con la información sensible redactada.
 */
export function sanitizeLogMessage(message: string): string {
  if (!message || typeof message !== "string") {
    return message;
  }

  let sanitized = message;

  // 1. Redactar JWTs y tokens Bearer
  sanitized = sanitized.replace(JWT_REGEX, "[REDACTED_JWT]");
  sanitized = sanitized.replace(BEARER_REGEX, "Bearer [REDACTED_TOKEN]");

  // 2. Redactar Credenciales
  sanitized = sanitized.replace(CREDENTIALS_REGEX, (match, p1) => {
    // Si el valor capturado es [REDACTED_JWT] u otra etiqueta nuestra, no lo reemplazamos con CREDENTIAL
    if (p1.startsWith("[REDACTED_")) {
      return match;
    }
    return match.replace(p1, "[REDACTED_CREDENTIAL]");
  });

  // 3. Redactar PII (Emails, DNI/NIE, Tarjetas de crédito)
  sanitized = sanitized.replace(EMAIL_REGEX, "[REDACTED_EMAIL]");
  sanitized = sanitized.replace(DNI_NIE_REGEX, "[REDACTED_DNI_NIE]");

  // Limpiar tarjetas con un enfoque más cuidadoso para no afectar fechas/números comunes,
  // aquí usamos la regex de CC definida arriba.
  sanitized = sanitized.replace(CREDIT_CARD_REGEX, (match) => {
    // Pequeña heurística: Si la longitud de solo dígitos es entre 14 y 16, la redactamos
    const digitsOnly = match.replace(/[\s-]/g, "");
    if (digitsOnly.length >= 14 && digitsOnly.length <= 16) {
      return "[REDACTED_CREDIT_CARD]";
    }
    return match;
  });

  return sanitized;
}
