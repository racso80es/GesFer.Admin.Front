import { test, expect } from '@playwright/test';

test.describe('Admin Frontend E2E (Full Stack Mock)', () => {

  test('Login and Navigate', async ({ page }) => {
    // 1. Go to Login
    await page.goto('/login');
    await page.waitForSelector('#username', { state: 'visible', timeout: 25000 });

    // 2. Fill credentials (mock server accepts anything)
    await page.fill('#username', 'admin');
    await page.fill('#password', 'password');

    // 3. Submit
    await page.click('button[type="submit"]');

    // 4. Verify Redirect to Dashboard
    await expect(page).toHaveURL(/\/dashboard/);

    // 5. Verify Dashboard Content (fetched from mock server)
    await expect(page.getByRole('heading', { name: 'Dashboard Administrativo' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Total Usuarios')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('42')).toBeVisible();
  });

  test('Companies Management', async ({ page }) => {
    // Helper to login first
    await page.goto('/login');
    await page.waitForSelector('#username', { state: 'visible', timeout: 25000 });
    await page.fill('#username', 'admin');
    await page.fill('#password', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/);

    // 1. Navigate to Companies
    await page.goto('/companies');

    // 2. Verify List (fetched from mock server)
    await expect(page.getByText('Organización Demo 1')).toBeVisible();

    // 3. Create New Company
    await page.goto('/companies/new');
    await page.fill('input#name', 'Nueva Organización Mock');
    await page.fill('input#address', 'Calle Mock 123');
    await page.fill('input#taxId', 'B12345678');

    await page.click('button[type="submit"]');

    // 4. Verify Redirect to List (esperar navegación tras crear)
    await expect(page).toHaveURL(/\/companies$/, { timeout: 10000 });
  });

});
