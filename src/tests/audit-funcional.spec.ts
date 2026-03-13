/**
 * Auditoría funcional — GesFer.Admin.Front
 * Valida el correcto funcionamiento del front actuando como usuario.
 * Requiere: API Admin activa (puerto 5011), credenciales en env.
 * Proceso: SddIA/tools/audit-funcional-frontend/
 */
import { test, expect } from '@playwright/test';

const USER = process.env.AUDIT_USER || process.env.NEXT_PUBLIC_ADMIN_DEFAULT_USERNAME || 'admin';
const PASS = process.env.AUDIT_PASS || process.env.NEXT_PUBLIC_ADMIN_DEFAULT_PASSWORD || 'admin123';

test.describe('Auditoría funcional — reemplazando a usuario', () => {

  test('1. Abrir /login — formulario visible', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /Acceso Administrativo|Administrativo/i })).toBeVisible();
    await expect(page.getByLabel(/Usuario|Usuario Administrativo/i)).toBeVisible();
    await expect(page.getByLabel(/Contraseña/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Acceder|Iniciar/i })).toBeVisible();
  });

  test('2. Login con credenciales válidas → redirect /dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('admin').fill(USER);
    await page.getByPlaceholder('••••••••').fill(PASS);
    await page.getByRole('button', { name: /Acceder|Iniciar/i }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
  });

  test('3. Dashboard carga resumen — cards con datos', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('admin').fill(USER);
    await page.getByPlaceholder('••••••••').fill(PASS);
    await page.getByRole('button', { name: /Acceder|Iniciar/i }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

    await expect(page.getByRole('heading', { name: /Dashboard Administrativo/i })).toBeVisible();
    await expect(page.getByText(/Total Companies|Total Usuarios|Empresas/i)).toBeVisible();
    await expect(page.getByText(/Organizaciones|Companies/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('4. Navegar a /companies — listado visible', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('admin').fill(USER);
    await page.getByPlaceholder('••••••••').fill(PASS);
    await page.getByRole('button', { name: /Acceder|Iniciar/i }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

    await page.goto('/companies');
    await expect(page.getByRole('heading', { name: /Organizaciones/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Nueva Organización/i })).toBeVisible();
    await expect(page.locator('table')).toBeVisible({ timeout: 5000 });
  });

  test('5. Crear nueva organización → listado actualizado', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('admin').fill(USER);
    await page.getByPlaceholder('••••••••').fill(PASS);
    await page.getByRole('button', { name: /Acceder|Iniciar/i }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

    await page.goto('/companies/new');
    await expect(page.getByRole('heading', { name: /Nueva Organización/i })).toBeVisible();

    const uniqueName = `Audit Test ${Date.now()}`;
    await page.locator('input#name').fill(uniqueName);
    await page.locator('input#address').fill('Calle Auditoría 1');
    await page.locator('input#taxId').fill('B12345678');

    await page.locator('form').getByRole('button', { name: /Guardar|Save|Crear|Create|Actualizar/i }).click();
    await expect(page).toHaveURL(/\/companies$/, { timeout: 10000 });
    await expect(page.getByText(uniqueName)).toBeVisible({ timeout: 5000 });
  });

  test('6. Editar organización existente', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('admin').fill(USER);
    await page.getByPlaceholder('••••••••').fill(PASS);
    await page.getByRole('button', { name: /Acceder|Iniciar/i }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

    await page.goto('/companies');
    const editBtn = page.getByRole('button', { name: /Editar|Pencil/i }).or(page.locator('a[href*="/edit"]')).first();
    await expect(editBtn).toBeVisible({ timeout: 5000 });
    await editBtn.click();

    await expect(page).toHaveURL(/\/companies\/.+\/edit/);
    await expect(page.getByRole('heading', { name: /Editar Organización/i })).toBeVisible();
    await expect(page.locator('input#name')).toBeVisible();
  });

  test('7. Cerrar sesión → redirect /login', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('admin').fill(USER);
    await page.getByPlaceholder('••••••••').fill(PASS);
    await page.getByRole('button', { name: /Acceder|Iniciar/i }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

    await page.getByTestId('shared-button-sidebar-logout').click();
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  });

  test('8. Acceso /dashboard sin sesión → redirect /login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  });
});
