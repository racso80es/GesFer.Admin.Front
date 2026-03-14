/**
 * Configuración específica para tests
 *
 * Todas las configuraciones desde variables de entorno.
 * En tests: API_URL, CLIENT_URL, DB_*, CACHE_* deben estar definidas.
 */

import type { AppConfig } from "./config";
import { getEnv } from "./env";

function envNum(key: string): number {
  const v = getEnv(key);
  if (!v) return 0;
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? 0 : n;
}

export const testConfig: AppConfig = {
  api: {
    url: getEnv("API_URL") ?? getEnv("ADMIN_API_URL") ?? "",
  },
  client: {
    url: getEnv("CLIENT_URL") ?? getEnv("NEXTAUTH_URL") ?? "",
  },
  database: {
    server: getEnv("DB_SERVER") ?? getEnv("DB_HOST") ?? "",
    port: envNum("DB_PORT"),
    database: getEnv("DB_DATABASE") ?? "",
    user: getEnv("DB_USER") ?? "",
    password: getEnv("DB_PASSWORD") ?? "",
    connectionString: getEnv("DB_CONNECTION_STRING") ?? undefined,
  },
  cache: {
    server: getEnv("CACHE_SERVER") ?? "",
    port: envNum("CACHE_PORT"),
    enabled: getEnv("CACHE_ENABLED") !== "false",
  },
  environment: "test",
};

if (testConfig.database.server && testConfig.database.database && !testConfig.database.connectionString) {
  testConfig.database.connectionString =
    `Server=${testConfig.database.server};Port=${testConfig.database.port};Database=${testConfig.database.database};User=${testConfig.database.user};Password=${testConfig.database.password};CharSet=utf8mb4;AllowUserVariables=True;AllowLoadLocalInfile=True;`;
}

export const TEST_API_URL = testConfig.api.url;
export const TEST_CLIENT_URL = testConfig.client.url;
export const TEST_DATABASE_CONFIG = testConfig.database;
export const TEST_DATABASE_CONNECTION_STRING =
  testConfig.database.connectionString ?? "";
export const TEST_CACHE_CONFIG = testConfig.cache;
export const TEST_CACHE_URL = `${testConfig.cache.server}:${testConfig.cache.port}`;
