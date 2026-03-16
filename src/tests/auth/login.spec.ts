import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('login-ok: credenciales válidas redirigen a dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.waitForSelector('#username', { state: 'visible', timeout: 25000 });
    await page.fill('#username', 'admin');
    await page.fill('#password', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: 'Dashboard Administrativo' })).toBeVisible({ timeout: 10000 });
  });

  test('login-ko-credenciales: credenciales inválidas muestran error', async ({ page }) => {
    await page.goto('/login');
    await page.waitForSelector('#username', { state: 'visible', timeout: 25000 });
    await page.fill('#username', 'invalid');
    await page.fill('#password', 'wrong');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByText(/credenciales inválidas|inválidas/i)).toBeVisible();
  });

  test('login-ko-red: formulario login visible sin API', async ({ page }) => {
    await page.goto('/login');
    await page.waitForSelector('#username', { state: 'visible', timeout: 25000 });
    await expect(page.getByRole('heading', { name: /acceso administrativo/i })).toBeVisible();
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByRole('button', { name: /acceder|iniciar/i })).toBeVisible();
  });
});
