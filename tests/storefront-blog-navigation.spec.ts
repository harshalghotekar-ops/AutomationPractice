import { test, expect } from '../fixtures/storefront-fixtures';

test.describe('Storefront and Catalog', () => {
  test('Read the news article', async ({ page, storefrontPage }) => {
    await storefrontPage.openHome();
    await storefrontPage.openBlog();

    const articleLink = page.getByRole('link', { name: 'First Post', exact: true });
    await expect(articleLink).toBeVisible();
    await expect(page.getByText('Posted by Shopify')).toBeVisible();

    await articleLink.click();
    await expect(page).toHaveURL(/\/blogs\/news\/12832805-first-post$/);
    await expect(
      page.getByRole('article').getByRole('heading', { name: 'First Post', level: 2 }),
    ).toBeVisible();

    await storefrontPage.openBlog();
    await expect(page).toHaveURL(/\/blogs\/news$/);
  });
});
