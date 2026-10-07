import { test, expect } from '../fixtures/storefront-fixtures';

test.describe('Storefront and Catalog', () => {
  test('Load the home page and follow primary navigation', async ({ page, storefrontPage }) => {
    await storefrontPage.openHome();

    await expect(page).toHaveTitle('Sauce Demo');
    await expect(page.getByRole('heading', { name: 'Sauce Demo', level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /^Log In$/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign up', exact: true })).toBeVisible();
    await expect(storefrontPage.cartLink).toContainText('(0)');
    await expect(page.getByRole('link', { name: 'Check Out', exact: true })).toBeVisible();

    for (const linkName of ['Home', 'Catalog', 'Blog', 'About Us', 'Wish list', 'Refer a friend']) {
      await expect(page.getByRole('link', { name: linkName, exact: true }).first()).toBeVisible();
    }

    await storefrontPage.openCatalog();
    await expect(page).toHaveURL(/\/collections\/all$/);

    await storefrontPage.returnHomeViaLogo();
    await expect(page).toHaveURL('/');
  });
});
