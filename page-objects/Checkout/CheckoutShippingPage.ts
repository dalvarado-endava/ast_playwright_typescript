import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "../AbstractPage";

export class CheckoutShippingPage extends AbstractPage {
  readonly page: Page;
  readonly termsOfServiceCheckbox: Locator;
  readonly termError: Locator;

  constructor(page: Page) {
    super(page);
    this.termsOfServiceCheckbox = page.locator("#cgv");
    this.termError = page.locator(".fancybox-error");
  }

  async acceptTerms() {
    await this.termsOfServiceCheckbox.check();
  }

  async waitForTerms() {
    await this.termsOfServiceCheckbox.waitFor({ state: "visible" });
  }

  async assertErrorVisible() {
    await expect(this.termError).toBeVisible();
  }
}
