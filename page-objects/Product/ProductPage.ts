import { Locator, Page, expect } from "@playwright/test";
import { AbstractPage } from "../AbstractPage";
import { AddToCartPopUp } from "../components/AddToCartPopUp";

export class ProductPage extends AbstractPage {
  readonly productName: Locator;
  readonly sizeSelector: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator("h1[itemprop='name']");
    this.sizeSelector = page.locator("#group_1");
    this.quantityInput = page.locator("#quantity_wanted");
    this.addToCartButton = page.locator("text='Add to cart'");
  }

  async changeQuantity(amount: number) {
    await this.quantityInput.type(amount.toString());
  }
  async changeSize(size: string) {
    if (size == "small" || size == "s") {
      await this.sizeSelector.selectOption("1");
    } else if (size == "medium" || size == "m") {
      await this.sizeSelector.selectOption("2");
    } else if (size == "large" || size == "l") {
      await this.sizeSelector.selectOption("3");
    }
  }
  async addToCart() {
    await this.addToCartButton.click();
  }
}
