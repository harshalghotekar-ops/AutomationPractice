import { type Locator, type Page } from '@playwright/test';

export class CatalogPage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Products', exact: true });
  }

  async open(): Promise<void> {
    await this.page.goto('/collections/all');
  }

  productLink(name: string): Locator {
    return this.page.getByRole('link').filter({ hasText: name }).first();
  }
}
