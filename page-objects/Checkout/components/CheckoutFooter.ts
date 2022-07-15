import { Locator, Page } from "@playwright/test";

export class CheckoutFooter {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator(
      ":nth-match(:text('Proceed to checkout'),2)"
    );
    this.backButton = page.locator("text='Continue Shopping'");
  }

  async clickOnCheckout() {
    await this.checkoutButton.click();
  }
  async goBack() {
    await this.backButton.click();
  }
}
