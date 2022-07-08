import { Page, Locator, expect } from "@playwright/test";
import { AbstractPage } from "../AbstractPage";

export class HomePage extends AbstractPage {
  // init locators with constructor
  constructor(page: Page) {
    super(page);
  }
  //define methods
}
