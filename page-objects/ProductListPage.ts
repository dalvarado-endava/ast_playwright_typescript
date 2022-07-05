import { Page, Locator, expect } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class ProductListPage extends AbstractPage {
  readonly firstProductContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.firstProductContainer = page.locator(
      ":nth-match('product-container', 1)"
    );
  }

  async clickOnProduct() {
    await this.firstProductContainer.click();
  }
}
