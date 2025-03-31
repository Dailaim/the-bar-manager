import { test, expect } from '@playwright/test';

test.describe('Bar Dashboard Create Order', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/"); 

    await page.waitForTimeout(3000); 
  });

 test('Create Order and Delete"', async ({ page }) => {
    const addButton = page.locator('div').filter({ hasText: /^2$/ }).getByRole('button')
    await addButton.click();

    const orderActual = page.getByText('Orden ActualCoronax1$115.');
    await expect(orderActual).toContainText('Coronax1');
    
    await page.pause();
    const editButton = page.getByRole('button', { name: 'Crear Orden' });
    await editButton.click();

    const cell = page.getByRole('cell', { name: 'Editar Eliminar' }).nth(1)

    const deleteButton = cell.getByRole('button', { name: 'Eliminar' });
    await deleteButton.click();
  });
});
