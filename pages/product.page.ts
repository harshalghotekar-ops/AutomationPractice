import { type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(slug: string): Promise<void> {
    await this.page.goto(`/products/${slug}`);
  }

  heading(name: string): Locator {
    return this.page.getByRole('heading', { name, exact: true });
  }

  get price(): Locator {
    return this.page.locator('#product-price');
  }

  get addToCartButton(): Locator {
    return this.page.getByRole('button', { name: 'Add to Cart', exact: true });
  }

  get soldOutButton(): Locator {
    return this.page.getByRole('button', { name: 'Sold Out', exact: true });
  }
}
