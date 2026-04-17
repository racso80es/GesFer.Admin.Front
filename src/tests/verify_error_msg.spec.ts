import { test, expect } from '@playwright/test';

test.describe('Admin E2E MOCKED Tests', () => {
  // Configurar intercepción ANTES de que cargue la página
  test.beforeEach(async ({ page }) => {
    // 1. Mock NextAuth Session API (para que next-auth crea que estamos logueados como Admin)
    await page.route('**/api/auth/session', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            name: 'Admin User',
            email: 'admin@test.com',
            role: 'Admin',
          },
          accessToken: 'fake-token-123',
          expires: new Date(Date.now() + 86400 * 1000).toISOString(),
        }),
      });
    });

    // Mock API POST /api/companies para forzar un error
    await page.route('**/api/companies', async (route, request) => {
      if (request.method() === 'POST') {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Error al crear la organización', detail: 'Simulated 500 error' }),
        });
      } else {
        await route.continue();
      }
    });
  });

  test('Create New Company should show error message on 500', async ({ page }) => {
    // Ir a la página (el middleware debería dejarnos pasar gracias al mock de sesión...
    // Opcionalmente podemos saltarnos el login e ir directo)
    await page.goto('http://localhost:3001/companies/new');

    await expect(page.getByRole('heading', { name: 'Nueva Organización' })).toBeVisible();

    // Fill form
    await page.fill('input[id="name"]', 'Test Company Error');
    await page.fill('input[id="address"]', 'Error St 123');

    // Submit
    await page.click('button[type="submit"]');

    // Verify error visual feedback
    const errorAlert = page.locator('.text-red-500.mb-4.p-3.bg-red-100');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText('Simulated 500 error');

    // Screenshot
    await page.screenshot({ path: '/home/jules/verification/verification.png' });
  });
});
