import { Locator, Page } from "@playwright/test";
import { AbstractPage } from "../AbstractPage";

export class MyAddressesPage extends AbstractPage {
  readonly newAddressButton: Locator;
  readonly addressesTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.newAddressButton = page.locator("text='Add a new address'");
    this.addressesTitle = page.locator(".page-heading");
  }

  async addNewAddress() {
    await this.newAddressButton.click();
  }

  async waitForTitle() {
    await this.addressesTitle.waitFor({ state: "visible" });
  }
}
