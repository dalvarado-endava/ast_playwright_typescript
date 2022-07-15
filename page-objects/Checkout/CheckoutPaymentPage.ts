import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "../AbstractPage";

export class CheckoutPaymentPage extends AbstractPage {
  readonly payBank: Locator;
  readonly payCheck: Locator;
  readonly confirmation: Locator;
  readonly confirmButton: Locator;

  constructor(page: Page) {
    super(page);
    this.payBank = page.locator(".bankwire");
    this.payCheck = page.locator(".cheque");
    this.confirmation = page.locator(".page-subheading");
    this.confirmButton = page.locator(
      '//span[contains(text(),"I confirm my order")]'
    );
  }

  async payByBank() {
    await this.payBank.click();
  }

  async payByCheck() {
    await this.payCheck.click();
  }

  async assertConfirmation(payment: string) {
    switch (payment) {
      case "bank":
        await expect(this.confirmation).toContainText("Bank-wire");
        break;
      case "check":
        await expect(this.confirmation).toContainText("Check");
        break;
      default:
        throw new Error("That payment method does not exist");
    }
  }

  async submitOrder() {
    await this.confirmButton.click();
  }
}
