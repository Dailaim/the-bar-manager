import { test, expect } from '@playwright/test';

test.describe('Bar Dashboard Visible Inventory', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/"); 

    await page.waitForTimeout(3000); 

    await page.getByRole('button', { name: 'Inventario' }).click();
  });

  test('Verify that the page title is Inventario', async ({ page }) => {
    const namePage = page.getByRole('heading', { name: 'Inventario' })
    await expect(namePage).toBeVisible();
  });

  test('Test that the table is visible', async ({ page }) => {
      const ordersTable = page.locator('table');
      await expect(ordersTable).toBeVisible();
  
      const firstOrder = page.locator('tbody tr').first();
      await expect(firstOrder).toContainText('Corona');
  });

});
