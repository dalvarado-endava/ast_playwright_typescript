import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "../AbstractPage";

export class CheckoutSummaryPage extends AbstractPage {
  readonly totalPrice: Locator;
  readonly deleteProduct: Locator;
  readonly availability: Locator;
  readonly addMoreProductsBtn: Locator;
  readonly lessProductsBtn: Locator;
  readonly emptyCartMessage: Locator;
  readonly cartQuantityInput: Locator;

  constructor(page: Page) {
    super(page);
    this.totalPrice = page.locator("#total_price");
    this.deleteProduct = page.locator(".icon-trash");
    this.availability = page.locator("//span[contains(text(),'In stock')]");
    this.addMoreProductsBtn = page.locator(".icon-plus");
    this.lessProductsBtn = page.locator(".icon-minus");
    this.emptyCartMessage = page.locator(".alert-warning");
    this.cartQuantityInput = page.locator(".cart_quantity_input");
  }

  async deleteCart() {
    await this.deleteProduct.click();
  }

  async addSomeProducts(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      await this.addMoreProductsBtn.click();
    }
  }

  async deleteSomeProducts(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      await this.lessProductsBtn.click();
    }
  }

  async changeProductAmount(amount: number) {
    await this.cartQuantityInput.type(amount.toString());
  }

  async assertEmptyCart() {
    await expect(this.emptyCartMessage).toContainText(
      "Your shopping cart is empty"
    );
  }

  async assertAvailability() {
    await expect(this.availability).toBeVisible();
  }
}
