import { test, expect } from '@playwright/test';

test.describe('Bar Dashboard Create Item', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/"); 

    await page.waitForTimeout(3000); 

    await page.getByRole('button', { name: 'Inventario' }).click();
  });

 test('Create Item and Delete"', async ({ page }) => {
    const addButton = page.getByRole('button', { name: 'Añadir' })
    await addButton.click();

    const inputName = page.getByRole('textbox')
    const inputQuantity = page.getByPlaceholder('0').first()
    const inputPrice = page.getByPlaceholder('0').nth(1)

    await inputName.fill('Test');
    await inputQuantity.fill('12');
    await inputPrice.fill('120');

    page.getByRole('row', { name: 'test 12' }).getByRole('button').first().click();

    await page.waitForTimeout(600);

    const deleteButton = page.getByRole('row', { name: 'Test 12' }).getByRole('button').nth(1).first()

    await deleteButton.click();
  });
});
