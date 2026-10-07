import { test, expect } from '../fixtures/storefront-fixtures';

test.describe('Storefront and Catalog', () => {
  test('Browse all products and verify listing data', async ({ page, catalogPage, storefrontPage }) => {
    await catalogPage.open();
    await expect(catalogPage.heading).toBeVisible();

    const products = [
      { name: 'Black heels', price: '\u00a345.00', soldOut: false },
      { name: 'Bronze sandals', price: '\u00a339.99', soldOut: false },
      { name: 'Brown Shades', price: '\u00a320.00', soldOut: true },
      { name: 'Grey jacket', price: '\u00a355.00', soldOut: false },
      { name: 'Noir jacket', price: '\u00a360.00', soldOut: false },
      { name: 'Striped top', price: '\u00a350.00', soldOut: false },
      { name: 'White sandals', price: '\u00a325.00', soldOut: true },
    ];

    for (const product of products) {
      const productLink = catalogPage.productLink(product.name);
      await expect(productLink).toBeVisible();
      await expect(productLink).toContainText(product.price);
      await expect(productLink.getByText('Sold Out', { exact: true })).toHaveCount(product.soldOut ? 1 : 0);
    }

    await catalogPage.productLink('Grey jacket').click();
    await expect(page).toHaveURL(/\/products\/grey-jacket$/);

    await storefrontPage.openCatalog();
    await expect(page).toHaveURL(/\/collections\/all$/);
  });
});
