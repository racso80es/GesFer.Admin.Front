/**
 * Módulo central de variables de entorno.
 * Todas las configuraciones se obtienen exclusivamente de process.env.
 * Sin valores hardcodeados; las variables requeridas lanzan error si faltan.
 *
 * @see .env.example para la lista de variables necesarias
 */

function requireEnv(name: string, hint?: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    const msg = hint
      ? `Variable de entorno requerida: ${name}. ${hint}`
      : `Variable de entorno requerida: ${name}. Ver .env.example`;
    throw new Error(msg);
  }
  return value.trim();
}

/** Obtiene variable opcional (sin fallback). */
export function getEnv(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() !== "" ? v.trim() : undefined;
}

/**
 * URL base de la API Admin (sin trailing slash).
 * Origen: ADMIN_API_URL o NEXT_PUBLIC_ADMIN_API_URL.
 */
export function getAdminApiUrl(): string {
  const url = getEnv("ADMIN_API_URL") ?? getEnv("NEXT_PUBLIC_ADMIN_API_URL");
  if (!url) {
    throw new Error(
      "ADMIN_API_URL o NEXT_PUBLIC_ADMIN_API_URL debe estar definida. Ver .env.example"
    );
  }
  return url.replace(/\/+$/, "");
}

/**
 * URL base de la API Admin o undefined si no está configurada.
 */
export function getAdminApiUrlOrUndefined(): string | undefined {
  const url = getEnv("ADMIN_API_URL") ?? getEnv("NEXT_PUBLIC_ADMIN_API_URL");
  return url ? url.replace(/\/+$/, "") : undefined;
}

/**
 * Secret para NextAuth.
 */
export function getAuthSecret(): string {
  return requireEnv("AUTH_SECRET", "Generar con: openssl rand -base64 32");
}

/**
 * URL de la aplicación (NextAuth, base para fetch interno).
 * Origen: NEXTAUTH_URL o VERCEL_URL (https://${VERCEL_URL}).
 */
export function getNextAuthUrl(): string {
  const url = getEnv("NEXTAUTH_URL");
  if (url) return url;
  const vercel = getEnv("VERCEL_URL");
  if (vercel) return `https://${vercel}`;
  throw new Error(
    "NEXTAUTH_URL debe estar definida (o VERCEL_URL en Vercel). Ver .env.example"
  );
}

/**
 * URL del cliente (frontend).
 * Origen: NEXT_PUBLIC_CLIENT_URL, NEXTAUTH_URL o CLIENT_URL.
 */
export function getClientUrl(): string {
  const url =
    getEnv("NEXT_PUBLIC_CLIENT_URL") ?? getEnv("NEXTAUTH_URL") ?? getEnv("CLIENT_URL");
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_CLIENT_URL, NEXTAUTH_URL o CLIENT_URL debe estar definida. Ver .env.example"
    );
  }
  return url;
}

/**
 * URL de la API para uso en next.config (build time).
 */
export function getPublicApiUrl(): string | undefined {
  return getEnv("NEXT_PUBLIC_API_URL") ?? getEnv("ADMIN_API_URL");
}

/**
 * Usuario por defecto para formulario de login (desarrollo).
 */
export function getDefaultAdminUsername(): string {
  return getEnv("NEXT_PUBLIC_ADMIN_DEFAULT_USERNAME") ?? "";
}

/**
 * Contraseña por defecto para formulario de login (desarrollo).
 */
export function getDefaultAdminPassword(): string {
  return getEnv("NEXT_PUBLIC_ADMIN_DEFAULT_PASSWORD") ?? "";
}

export const env = {
  getAdminApiUrl,
  getAdminApiUrlOrUndefined,
  getAuthSecret,
  getNextAuthUrl,
  getClientUrl,
  getPublicApiUrl,
  getDefaultAdminUsername,
  getDefaultAdminPassword,
  getEnv,
  requireEnv,
};
