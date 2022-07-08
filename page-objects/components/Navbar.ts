import { Page, Locator, expect } from "@playwright/test";
import { NavbarButton } from "../../helpers/Enums";

export class Navbar {
  readonly page: Page;
  readonly womenTab: Locator;
  readonly dressesTab: Locator;
  readonly shirtTab: Locator;
  readonly searchBar: Locator;
  readonly searchButton: Locator;
  readonly viewCart: Locator;
  readonly contactUsButton: Locator;
  readonly signInButton: Locator;

  readonly cartProductList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.womenTab = page.locator("a[title='Women']");
    this.dressesTab = page.locator("a[title='Dresses}");
    this.shirtTab = page.locator("a[title='T-shirts']");
    this.searchBar = page.locator("#search_query_top");
    this.searchButton = page.locator("button[name='submit_search']");
    this.viewCart = page.locator("text='Cart'");
    this.contactUsButton = page.locator("#contact-link");
    this.signInButton = page.locator(".login");

    //TODO: Check this locator
    this.cartProductList = page.locator(".products > dt");
  }

  async clickOn(button: NavbarButton) {
    switch (button) {
      case NavbarButton.WOMEN_TAB:
        await this.womenTab.click();
        break;
      case NavbarButton.DRESSES_TAB:
        await this.dressesTab.click();
        break;
      case NavbarButton.TSHIRTS_TAB:
        await this.shirtTab.click();
        break;
      case NavbarButton.SEARCHBUTTON:
        await this.searchButton.click();
        break;
      case NavbarButton.CART:
        await this.viewCart.click();
        break;
      case NavbarButton.CONTACT:
        await this.contactUsButton.click();
        break;
      case NavbarButton.SIGNIN:
        await this.signInButton.click();
        break;

      default:
        throw new Error("That button does not exist.");
    }
  }

  async search(query: string) {
    await this.searchBar.type(query);
    await this.page.keyboard.press("Enter");
  }

  async assertCartItems(amount: number) {
    await expect(this.cartProductList).toHaveCount(amount);
  }
}
