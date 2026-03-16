import { test, expect } from '../fixtures/auth';

test.describe('Dashboard', () => {
  test('dashboard-resumen: resumen cargado tras login', async ({ authenticatedPage: page }) => {
    await expect(page.getByRole('heading', { name: 'Dashboard Administrativo' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Total Usuarios')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('42')).toBeVisible();
  });

  test('dashboard-sesion: info de sesión visible', async ({ authenticatedPage: page }) => {
    await expect(page.getByText(/usuario:|bienvenido/i).first()).toBeVisible({ timeout: 10000 });
  });
});
