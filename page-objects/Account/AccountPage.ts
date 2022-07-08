import { Page, Locator, expect } from "@playwright/test";
import { AccountButton } from "../../helpers/Enums";
import { AbstractPage } from "../AbstractPage";

export class AccountPage extends AbstractPage {
  readonly accountTitle;
  readonly orderHistory: Locator;
  readonly creditSlips: Locator;
  readonly addresses: Locator;
  readonly personalInfo: Locator;
  readonly wishlist: Locator;
  readonly homeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.accountTitle = page.locator("//h1[contains(text(),'My account')]");
    this.orderHistory = page.locator("[title='Orders']");
    this.creditSlips = page.locator("[title='Credit slips']");
    this.addresses = page.locator("[title='Addresses']");
    this.personalInfo = page.locator("[title='Information']");
    this.wishlist = page.locator("[title='My wishlists']");
    this.homeButton = page.locator("[title='Home']");
  }

  async clickOn(button: AccountButton) {
    switch (button) {
      case AccountButton.ORDER_DETAILS:
        await this.orderHistory.click();
        break;
      case AccountButton.CREDIT_SLIPS:
        await this.orderHistory.click();
        break;
      case AccountButton.ADDRESSES:
        await this.orderHistory.click();
        break;
      case AccountButton.PERSONAL_INFO:
        await this.orderHistory.click();
        break;
      case AccountButton.WISHLIST:
        await this.orderHistory.click();
        break;
      case AccountButton.HOME:
        await this.orderHistory.click();
        break;
      default:
        throw new Error("That button does not exist");
    }
  }

  async assertSuccess() {
    await expect(this.accountTitle).toBeVisible();
  }
}
