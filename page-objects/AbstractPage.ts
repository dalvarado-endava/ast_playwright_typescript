import { Page } from "@playwright/test";

export class AbstractPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visitHome() {
    await this.page.goto("http://automationpractice.com");
  }
}
