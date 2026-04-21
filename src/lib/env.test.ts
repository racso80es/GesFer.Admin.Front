import {
  getEnv,
  getAdminApiUrl,
  getAdminApiUrlOrUndefined,
  getAuthSecret,
  getNextAuthUrl,
  getClientUrl,
  getPublicApiUrl,
  getDefaultAdminUsername,
  getDefaultAdminPassword,
  env as envObj
} from './env';

const { requireEnv } = envObj;

describe('env utilities', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    // Clear CI/build flags if present in the environment running the tests
    delete process.env.npm_lifecycle_event;
    delete process.env.CI;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('requireEnv', () => {
    it('returns the trimmed value if it exists', () => {
      process.env.TEST_VAR = '  value  ';
      expect(requireEnv('TEST_VAR')).toBe('value');
    });

    it('throws an error if the variable is missing', () => {
      expect(() => requireEnv('MISSING_VAR')).toThrow(
        'Variable de entorno requerida: MISSING_VAR. Ver .env.example'
      );
    });

    it('throws an error if the variable is an empty string or spaces', () => {
      process.env.EMPTY_VAR = '   ';
      expect(() => requireEnv('EMPTY_VAR')).toThrow(
        'Variable de entorno requerida: EMPTY_VAR. Ver .env.example'
      );
    });

    it('includes the hint in the error message if provided', () => {
      expect(() => requireEnv('MISSING_VAR', 'This is a hint')).toThrow(
        'Variable de entorno requerida: MISSING_VAR. This is a hint'
      );
    });

    it('bypasses error and returns dummy value during build (npm_lifecycle_event)', () => {
      process.env.npm_lifecycle_event = 'build';
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      expect(requireEnv('MISSING_VAR')).toBe('dummy-value-for-build');
      expect(consoleSpy).toHaveBeenCalledWith(
        '⚠️ [BUILD/CI] Ignorando falta de variable requerida: MISSING_VAR'
      );
      consoleSpy.mockRestore();
    });

    it('bypasses error and returns dummy value during CI', () => {
      process.env.CI = 'true';
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      expect(requireEnv('MISSING_VAR')).toBe('dummy-value-for-build');
      expect(consoleSpy).toHaveBeenCalledWith(
        '⚠️ [BUILD/CI] Ignorando falta de variable requerida: MISSING_VAR'
      );
      consoleSpy.mockRestore();
    });
  });

  describe('getEnv', () => {
    it('returns the trimmed value if it exists', () => {
      process.env.TEST_VAR = '  value  ';
      expect(getEnv('TEST_VAR')).toBe('value');
    });

    it('returns undefined if the variable is missing', () => {
      expect(getEnv('MISSING_VAR')).toBeUndefined();
    });

    it('returns undefined if the variable is an empty string or just spaces', () => {
      process.env.EMPTY_VAR = '   ';
      expect(getEnv('EMPTY_VAR')).toBeUndefined();
    });
  });

  describe('getAdminApiUrl', () => {
    it('returns ADMIN_API_URL without trailing slash', () => {
      process.env.ADMIN_API_URL = 'https://api.example.com/  ';
      expect(getAdminApiUrl()).toBe('https://api.example.com');
    });

    it('falls back to NEXT_PUBLIC_ADMIN_API_URL', () => {
      process.env.NEXT_PUBLIC_ADMIN_API_URL = 'https://public-api.example.com/';
      expect(getAdminApiUrl()).toBe('https://public-api.example.com');
    });

    it('throws an error if neither is defined', () => {
      expect(() => getAdminApiUrl()).toThrow(
        'ADMIN_API_URL o NEXT_PUBLIC_ADMIN_API_URL debe estar definida. Ver .env.example'
      );
    });
  });

  describe('getAdminApiUrlOrUndefined', () => {
    it('returns URL without trailing slash if defined', () => {
      process.env.ADMIN_API_URL = 'https://api.example.com/';
      expect(getAdminApiUrlOrUndefined()).toBe('https://api.example.com');
    });

    it('returns undefined if neither is defined', () => {
      expect(getAdminApiUrlOrUndefined()).toBeUndefined();
    });
  });

  describe('getAuthSecret', () => {
    it('returns AUTH_SECRET', () => {
      process.env.AUTH_SECRET = 'secret123';
      expect(getAuthSecret()).toBe('secret123');
    });
  });

  describe('getNextAuthUrl', () => {
    it('returns NEXTAUTH_URL if defined', () => {
      process.env.NEXTAUTH_URL = 'https://auth.example.com';
      expect(getNextAuthUrl()).toBe('https://auth.example.com');
    });

    it('falls back to VERCEL_URL', () => {
      process.env.VERCEL_URL = 'project.vercel.app';
      expect(getNextAuthUrl()).toBe('https://project.vercel.app');
    });

    it('throws an error if neither is defined', () => {
      expect(() => getNextAuthUrl()).toThrow(
        'NEXTAUTH_URL debe estar definida (o VERCEL_URL en Vercel). Ver .env.example'
      );
    });
  });

  describe('getClientUrl', () => {
    it('returns NEXT_PUBLIC_CLIENT_URL if defined', () => {
      process.env.NEXT_PUBLIC_CLIENT_URL = 'https://client.example.com';
      expect(getClientUrl()).toBe('https://client.example.com');
    });

    it('falls back to NEXTAUTH_URL', () => {
      process.env.NEXTAUTH_URL = 'https://auth.example.com';
      expect(getClientUrl()).toBe('https://auth.example.com');
    });

    it('falls back to CLIENT_URL', () => {
      process.env.CLIENT_URL = 'https://fallback.example.com';
      expect(getClientUrl()).toBe('https://fallback.example.com');
    });

    it('throws an error if none are defined', () => {
      expect(() => getClientUrl()).toThrow(
        'NEXT_PUBLIC_CLIENT_URL, NEXTAUTH_URL o CLIENT_URL debe estar definida. Ver .env.example'
      );
    });
  });

  describe('getPublicApiUrl', () => {
    it('returns NEXT_PUBLIC_API_URL if defined', () => {
      process.env.NEXT_PUBLIC_API_URL = 'https://public-api.example.com';
      expect(getPublicApiUrl()).toBe('https://public-api.example.com');
    });

    it('falls back to ADMIN_API_URL', () => {
      process.env.ADMIN_API_URL = 'https://admin-api.example.com';
      expect(getPublicApiUrl()).toBe('https://admin-api.example.com');
    });

    it('returns undefined if neither is defined', () => {
      expect(getPublicApiUrl()).toBeUndefined();
    });
  });

  describe('getDefaultAdminUsername', () => {
    it('returns NEXT_PUBLIC_ADMIN_DEFAULT_USERNAME if defined', () => {
      process.env.NEXT_PUBLIC_ADMIN_DEFAULT_USERNAME = 'admin';
      expect(getDefaultAdminUsername()).toBe('admin');
    });

    it('returns empty string if not defined', () => {
      expect(getDefaultAdminUsername()).toBe('');
    });
  });

  describe('getDefaultAdminPassword', () => {
    it('returns NEXT_PUBLIC_ADMIN_DEFAULT_PASSWORD if defined', () => {
      process.env.NEXT_PUBLIC_ADMIN_DEFAULT_PASSWORD = 'password';
      expect(getDefaultAdminPassword()).toBe('password');
    });

    it('returns empty string if not defined', () => {
      expect(getDefaultAdminPassword()).toBe('');
    });
  });
});
