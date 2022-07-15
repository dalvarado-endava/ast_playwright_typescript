import { Locator, Page } from "@playwright/test";
import { AbstractPage } from "../AbstractPage";

export class CheckoutAddressPage extends AbstractPage {
  readonly addressSelector: Locator;
  readonly commentTextArea: Locator;

  constructor(page: Page) {
    super(page);
    this.commentTextArea = page.locator("[name='message']");
    this.addressSelector = page.locator("#id_address_delivery");
  }

  async waitForSelectorVisible() {
    await this.addressSelector.waitFor({ state: "visible" });
  }

  async addMessage(message: string) {
    await this.commentTextArea.type(message);
  }
}
