import { Page, Locator, expect } from "@playwright/test";
import { AbstractPage } from "../AbstractPage";

export class ProductListPage extends AbstractPage {
  readonly firstProductContainer: Locator;
  readonly categoryList: Locator;

  constructor(page: Page) {
    super(page);
    this.firstProductContainer = page.locator(
      "//a[contains(text(),'Faded Short Sleeve T-shirts')]"
    );
    this.categoryList = page.locator("#categories_block_left");
  }

  async clickOnProduct() {
    await this.firstProductContainer.click();
  }

  async waitForList() {
    await this.categoryList.waitFor({ state: "visible" });
  }
}
