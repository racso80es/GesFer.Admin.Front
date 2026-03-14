/**
 * Configuración de Next.js para Admin
 *
 * La URL de la API se obtiene exclusivamente de variables de entorno:
 * - NEXT_PUBLIC_API_URL (prioridad)
 * - ADMIN_API_URL (alternativa)
 */
const getPublicApiUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || process.env.ADMIN_API_URL;
};

const path = require('path');
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: getPublicApiUrl(),
  },
  experimental: {
    optimizePackageImports: ['@tanstack/react-query'],
  },
  output: "standalone",
  webpack: (config) => {
    config.resolve.modules.push(path.resolve(__dirname, 'node_modules'));
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
