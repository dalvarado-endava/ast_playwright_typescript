import { Page, Locator, expect } from "@playwright/test";

export class AddToCartPopUp {
  readonly page: Page;
  readonly popUpCart: Locator;
  readonly productName: Locator;
  readonly productCartAmount: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.popUpCart = page.locator("#layer_cart");
    this.productName = page.locator("#layer_cart_product_title");
    this.productCartAmount = page.locator("//span[contains(text(),'There is') or contains(text(),'There are'))]")
    this.checkoutButton = page.locator("text='Proceed to checkout'");
    this.continueShoppingButton = page.locator("text='Continue shopping'");
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async assertPopUpVisible() {
    await expect(this.popUpCart).toBeVisible();
  }

  async assertProductName(name: string) {
    await expect(this.productName).toContainText(name);
  }

  async assertProductAmount(amount:number){
    await expect(this.productCartAmount).toContainText(`${amount.toString()} item`)
  }


}
