import { test, expect } from '../fixtures/storefront-fixtures';

test.describe('Storefront and Catalog', () => {
  test('Read the About Us page', async ({ page, storefrontPage }) => {
    await storefrontPage.openHome();
    await storefrontPage.openAbout();

    await expect(page).toHaveURL(/\/pages\/about-us$/);
    await expect(page.getByRole('heading', { name: 'About Us', level: 1 })).toBeVisible();
    const pageContent = page.locator('#page-content');
    await expect(pageContent.getByText(/This is a demo site created for/)).toBeVisible();
    await expect(pageContent.getByRole('link', { name: 'Sauce', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Search', exact: true }).first()).toBeVisible();
  });
});
