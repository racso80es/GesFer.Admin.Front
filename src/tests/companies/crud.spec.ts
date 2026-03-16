import { test, expect } from '../fixtures/auth';

test.describe('CRUD Organizaciones', () => {
  test('organizaciones-listar: lista visible', async ({ authenticatedPage: page }) => {
    await page.goto('/companies');
    await expect(page.getByRole('heading', { name: 'Organizaciones' })).toBeVisible();
    await expect(page.getByText('Organización Demo 1')).toBeVisible();
  });

  test('organizaciones-crear: crear nueva organización', async ({ authenticatedPage: page }) => {
    await page.goto('/companies/new');
    await page.fill('#name', 'Nueva Organización Mock');
    await page.fill('#address', 'Calle Mock 123');
    await page.fill('#taxId', 'B12345678');
    await page.fill('#email', 'test@mock.com');
    await page.getByRole('button', { name: 'Crear' }).click();
    await expect(page).toHaveURL(/\/companies$/);
  });

  test('organizaciones-editar: editar organización existente', async ({ authenticatedPage: page }) => {
    await page.goto('/companies');
    await page.locator('a[href*="/edit"]').first().click();
    await expect(page).toHaveURL(/\/companies\/[^/]+\/edit/);
    await page.fill('#name', 'Organización Demo 1 Modificada');
    await page.getByRole('button', { name: 'Actualizar' }).click();
    await expect(page).toHaveURL(/\/companies$/);
    await expect(page.getByText('Organización Demo 1 Modificada')).toBeVisible();
  });

  test('organizaciones-validacion: campos requeridos', async ({ authenticatedPage: page }) => {
    await page.goto('/companies/new');
    await page.getByRole('button', { name: 'Crear' }).click();
    await expect(page).toHaveURL(/\/companies\/new/);
    await expect(page.getByText(/obligatorio|requerido/i).first()).toBeVisible({ timeout: 5000 });
  });
});
