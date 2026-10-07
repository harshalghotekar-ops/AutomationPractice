import { type Locator, type Page } from '@playwright/test';

export class StorefrontPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.cartLink = page.getByRole('link', { name: /^My Cart/ });
  }

  async openHome(): Promise<void> {
    await this.page.goto('/');
  }

  async openCatalog(): Promise<void> {
    await this.page.getByRole('link', { name: 'Catalog', exact: true }).click();
  }

  async openBlog(): Promise<void> {
    await this.page.getByRole('link', { name: 'Blog', exact: true }).click();
  }

  async openAbout(): Promise<void> {
    await this.page.getByRole('link', { name: 'About Us', exact: true }).first().click();
  }

  async returnHomeViaLogo(): Promise<void> {
    await this.page
      .getByRole('heading', { name: 'Sauce Demo' })
      .getByRole('link', { name: 'Sauce Demo' })
      .click();
  }
}
