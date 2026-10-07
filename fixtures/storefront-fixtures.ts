import { test as base, expect } from '@playwright/test';
import { CatalogPage } from '../pages/catalog.page';
import { ProductPage } from '../pages/product.page';
import { StorefrontPage } from '../pages/storefront.page';

type StorefrontFixtures = {
  storefrontPage: StorefrontPage;
  catalogPage: CatalogPage;
  productPage: ProductPage;
};

export const test = base.extend<StorefrontFixtures>({
  storefrontPage: async ({ page }, use) => {
    await use(new StorefrontPage(page));
  },
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
});

export { expect };
