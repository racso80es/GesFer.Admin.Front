/**
 * Sistema de configuración centralizado para GesFer Admin
 *
 * Todas las configuraciones se obtienen de variables de entorno (process.env).
 * Sin valores hardcodeados. Ver .env.example para la lista de variables.
 */

import { getAdminApiUrl, getClientUrl, getEnv } from "./env";

export interface AppConfig {
  api: {
    url: string;
  };
  client: {
    url: string;
  };
  database: {
    server: string;
    port: number;
    database: string;
    user: string;
    password: string;
    connectionString?: string;
  };
  cache: {
    server: string;
    port: number;
    enabled: boolean;
  };
  environment: string;
}

type Environment = 'local' | 'development' | 'production' | 'test';

/**
 * Obtiene el entorno actual basado en variables de entorno
 */
function getEnvironment(): Environment {
  // En Node.js (tests, scripts)
  if (typeof window === 'undefined') {
    if (process.env.NODE_ENV === 'test' || process.env.TEST_ENV === 'true') {
      return 'test';
    }
    if (process.env.NODE_ENV === 'production') {
      return 'production';
    }
    if (process.env.NODE_ENV === 'development') {
      return 'development';
    }
    // Por defecto en Node.js es local
    return 'local';
  }

  // En el navegador (cliente)
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    return 'production';
  }
  if (process.env.NEXT_PUBLIC_ENV === 'development') {
    return 'development';
  }
  // Por defecto en navegador es development
  return 'development';
}

/**
 * Carga la configuración según el entorno
 */
function loadConfig(): AppConfig {
  const env = getEnvironment();

  try {
    // En Node.js podemos cargar archivos JSON directamente
    if (typeof window === 'undefined') {
      const fs = require('fs');
      const path = require('path');
      const configPath = path.join(process.cwd(), 'config', `${env}.json`);

      if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, 'utf-8');
        const config = JSON.parse(configContent);

        // Generar connectionString si no está definido
        if (config.database && !config.database.connectionString) {
          config.database.connectionString =
            `Server=${config.database.server};Port=${config.database.port};Database=${config.database.database};User=${config.database.user};Password=${config.database.password};CharSet=utf8mb4;AllowUserVariables=True;AllowLoadLocalInfile=True;`;
        }

        return config;
      }
    }

    // Fallback: usar variables de entorno o valores por defecto
    return getDefaultConfig(env);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Error loading config for ${env}, using defaults:`, message);
    return getDefaultConfig(env);
  }
}

/** Lee valor numérico de env; si no está definido, devuelve 0 (config no usada). */
function envNum(key: string): number {
  const v = getEnv(key);
  if (!v) return 0;
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? 0 : n;
}

/**
 * Obtiene configuración desde variables de entorno (sin fallbacks hardcodeados).
 */
function getDefaultConfig(env: Environment): AppConfig {
  const configs: Record<Environment, AppConfig> = {
    local: {
      api: { url: getAdminApiUrl() },
      client: { url: getClientUrl() },
      database: {
        server: getEnv("DB_SERVER") ?? getEnv("DB_HOST") ?? "",
        port: envNum("DB_PORT"),
        database: getEnv("DB_DATABASE") ?? "",
        user: getEnv("DB_USER") ?? "",
        password: getEnv("DB_PASSWORD") ?? "",
      },
      cache: {
        server: getEnv("CACHE_SERVER") ?? "",
        port: envNum("CACHE_PORT"),
        enabled: getEnv("CACHE_ENABLED") !== "false",
      },
      environment: "local",
    },
    development: {
      api: { url: getAdminApiUrl() },
      client: { url: getClientUrl() },
      database: {
        server: getEnv("DB_SERVER") ?? getEnv("DB_HOST") ?? "",
        port: envNum("DB_PORT"),
        database: getEnv("DB_DATABASE") ?? "",
        user: getEnv("DB_USER") ?? "",
        password: getEnv("DB_PASSWORD") ?? "",
      },
      cache: {
        server: getEnv("CACHE_SERVER") ?? "",
        port: envNum("CACHE_PORT"),
        enabled: getEnv("CACHE_ENABLED") !== "false",
      },
      environment: "development",
    },
    production: {
      api: { url: getAdminApiUrl() },
      client: { url: getClientUrl() },
      database: {
        server: getEnv("DB_SERVER") ?? getEnv("DB_HOST") ?? "",
        port: envNum("DB_PORT"),
        database: getEnv("DB_DATABASE") ?? "",
        user: getEnv("DB_USER") ?? "",
        password: getEnv("DB_PASSWORD") ?? "",
      },
      cache: {
        server: getEnv("CACHE_SERVER") ?? "",
        port: envNum("CACHE_PORT"),
        enabled: getEnv("CACHE_ENABLED") !== "false",
      },
      environment: "production",
    },
    test: {
      api: { url: getAdminApiUrl() },
      client: { url: getClientUrl() },
      database: {
        server: getEnv("DB_SERVER") ?? getEnv("DB_HOST") ?? "",
        port: envNum("DB_PORT"),
        database: getEnv("DB_DATABASE") ?? "",
        user: getEnv("DB_USER") ?? "",
        password: getEnv("DB_PASSWORD") ?? "",
      },
      cache: {
        server: getEnv("CACHE_SERVER") ?? "",
        port: envNum("CACHE_PORT"),
        enabled: getEnv("CACHE_ENABLED") !== "false",
      },
      environment: "test",
    },
  };

  const db = configs[env].database;
  if (db.server && db.database && db.user) {
    db.connectionString =
      `Server=${db.server};Port=${db.port};Database=${db.database};User=${db.user};Password=${db.password};CharSet=utf8mb4;AllowUserVariables=True;AllowLoadLocalInfile=True;`;
  }

  return configs[env];
}

// Cargar configuración
const config = loadConfig();

/**
 * Configuración de la aplicación
 */
export const appConfig: AppConfig = config;

/**
 * URL de la API
 */
export const API_URL = appConfig.api.url;

/**
 * URL del Cliente
 */
export const CLIENT_URL = appConfig.client.url;

/**
 * Entorno actual
 */
export const ENVIRONMENT = appConfig.environment;

/**
 * Configuración de base de datos
 */
export const DATABASE_CONFIG = appConfig.database;

/**
 * Connection string de base de datos
 */
export const DATABASE_CONNECTION_STRING =
  appConfig.database.connectionString ??
  (appConfig.database.server && appConfig.database.database
    ? `Server=${appConfig.database.server};Port=${appConfig.database.port};Database=${appConfig.database.database};User=${appConfig.database.user};Password=${appConfig.database.password};CharSet=utf8mb4;AllowUserVariables=True;AllowLoadLocalInfile=True;`
    : "");

/**
 * Configuración de caché
 */
export const CACHE_CONFIG = appConfig.cache;

/**
 * URL del servidor de caché
 */
export const CACHE_URL = `${appConfig.cache.server}:${appConfig.cache.port}`;

// Exportar por defecto
export default appConfig;
