import { Page } from "@playwright/test";
import { Urls } from "../testdata/UserData";

export class AbstractPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto(Urls.baseUrl);
  }
}
