import { test, expect } from '@playwright/test';

test.describe('Bar Dashboard Visible Orders', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/"); 

    await page.waitForTimeout(3000); 
  });

  test('Verify that the page title is "The bar dashboard"', async ({ page }) => {
    await expect(page).toHaveTitle('The bar dashboard');
  });

  test('Verify that all products are visible', async ({ page }) => {
    const corona = await page.getByText('Corona$115.002');
    const quilmes = await page.getByText('Quilmes$120.000');
    const clubColombia = await page.getByText('Club Colombia$110.003');

    await expect(corona).toBeVisible();
    await expect(quilmes).toBeVisible();
    await expect(clubColombia).toBeVisible();
  });

  test('Verify that the orders table is visible', async ({ page }) => {
    const ordersTable = page.locator('table');
    await expect(ordersTable).toBeVisible();

    const firstOrder = page.locator('tbody tr').first();
    await expect(firstOrder).toContainText('Corona');
  });

  test('Add a new product to the cart', async ({ page }) => {
    const addButton = page.locator('div').filter({ hasText: /^2$/ }).getByRole('button')
    await addButton.click();

    const orderActual = page.getByText('Orden ActualCoronax1$115.');
    await expect(orderActual).toContainText('Coronax1');
  });

  test('Verify that the edit and delete buttons are visible', async ({ page }) => {
    const editButtons = page.getByRole('link', { name: 'Editar' });
    const deleteButtons = page.getByRole('button', { name: 'Eliminar' });

    await expect(editButtons.first()).toBeVisible();
    await expect(deleteButtons.first()).toBeVisible();
  });
});
