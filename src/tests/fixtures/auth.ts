import { test as base } from '@playwright/test';
import type { Page } from '@playwright/test';

const E2E_USER = process.env.E2E_ADMIN_USER ?? 'admin';
const E2E_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'password';

/**
 * Fixture que proporciona una página ya autenticada.
 * Requiere que el mock API o la API real esté disponible.
 */
export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.waitForSelector('#username', { state: 'visible', timeout: 25000 });
    await page.fill('#username', E2E_USER);
    await page.fill('#password', E2E_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/dashboard/);
    await use(page);
  },
});

export { expect } from '@playwright/test';
