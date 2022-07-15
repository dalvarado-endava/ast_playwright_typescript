import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "../AbstractPage";

export class CheckoutConfirmationPage extends AbstractPage {
  readonly checkConfirmation: Locator;
  readonly bankConfirmation: Locator;

  constructor(page: Page) {
    super(page);
    this.checkConfirmation = page.locator(".alert-success");
    this.bankConfirmation = page.locator(
      'text="Your order on My Store is complete."'
    );
  }

  async assertConfirmation(type: string) {
    switch (type) {
      case "bank":
        await expect(this.bankConfirmation).toBeVisible;
        break;
      case "check":
        await expect(this.checkConfirmation).toBeVisible;
        break;
      default:
        throw new Error("This payment method does not exist");
    }
  }
}
