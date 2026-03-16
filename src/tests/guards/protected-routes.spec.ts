import { test, expect } from '@playwright/test';

test.describe('Protección de rutas', () => {
  test('proteccion-dashboard: sin sesión redirige a login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('proteccion-companies: sin sesión redirige a login', async ({ page }) => {
    await page.goto('/companies');
    await expect(page).toHaveURL(/\/login/);
  });

  test('proteccion-logs: sin sesión redirige a login', async ({ page }) => {
    await page.goto('/logs');
    await expect(page).toHaveURL(/\/login/);
  });
});
