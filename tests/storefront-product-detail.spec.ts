import { test, expect } from '../fixtures/storefront-fixtures';

test.describe('Storefront and Catalog', () => {
  test('Read a product detail page', async ({ page, productPage }) => {
    await productPage.open('grey-jacket');

    await expect(productPage.heading('Grey jacket')).toBeVisible();
    await expect(productPage.price).toHaveText('\u00a355.00');
    await expect(page.getByRole('img', { name: 'Product Image' })).toBeVisible();
    await expect(page.getByRole('combobox')).toBeVisible();
    await expect(page.getByRole('combobox').locator('option')).toHaveText(['Grey jacket']);
    await expect(productPage.addToCartButton).toBeEnabled();

    await productPage.open('brown-shades');
    await expect(productPage.heading('Brown Shades')).toBeVisible();
    await expect(productPage.price).toHaveText('\u00a320.00');
    await expect(productPage.soldOutButton).toBeDisabled();
  });
});
