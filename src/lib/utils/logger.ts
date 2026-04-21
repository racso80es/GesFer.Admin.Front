export function sanitizeLogMessage(message: string): string {
  let sanitized = message;
  // Redact Bearer tokens
  sanitized = sanitized.replace(/Bearer\s+[A-Za-z0-9\-\._~\+\/]+=*/g, "Bearer [REDACTED]");
  // Redact passwords
  sanitized = sanitized.replace(/"password"\s*:\s*"[^"]+"/g, '"password":"[REDACTED]"');
  sanitized = sanitized.replace(/password=[^&\s]+/g, "password=[REDACTED]");
  // Redact emails
  sanitized = sanitized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL REDACTED]");
  return sanitized;
}
