import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  //Define locators
  readonly page: Page;
  readonly loginButton: Locator;

  // init locators with constructor
  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator(".login");
  }
  //define methods
  async visit() {
    await this.page.goto("http://automationpractice.com/index.php");
  }
  async clickLogin() {
    await this.loginButton.click();
  }
}
