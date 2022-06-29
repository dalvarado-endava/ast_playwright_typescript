import { Page, Locator, expect } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class RegisterPage extends AbstractPage {
  readonly customerFirstNameInput: Locator;
  readonly customerLastNameInput: Locator;
  readonly passwordInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateSelector: Locator;
  readonly zipCode: Locator;
  readonly countrySelector: Locator;
  readonly mobilePhone: Locator;

  readonly errorMessage: Locator;

  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.customerFirstNameInput = page.locator("#customer_firstname");
    this.customerLastNameInput = page.locator("#customer_lastname");
    this.passwordInput = page.locator("#passwd");
    this.firstNameInput = page.locator("#firstname");
    this.lastNameInput = page.locator("#lastname");
    this.addressInput = page.locator("#address1");
    this.cityInput = page.locator("#city");
    this.stateSelector = page.locator("#id_state");
    this.zipCode = page.locator("#postcode");
    this.countrySelector = page.locator("#id_country");
    this.mobilePhone = page.locator("#phone_mobile");
    this.submitButton = page.locator("#submitAccount");
    this.errorMessage = page.locator(
      "//p[contains(text(),'There is') or contains(text(), 'There are')]"
    );
  }

  async fillRegisterForm(
    customerName?: string,
    customerLastName?: string,
    password?: string,
    address?: string,
    city?: string,
    zipCode?: number,
    mobilePhone?: number
  ) {
    if (typeof customerName !== "undefined") {
      await this.customerFirstNameInput.type(customerName);
    }
    if (typeof customerLastName !== "undefined") {
      await this.customerLastNameInput.type(customerLastName);
    }
    if (typeof password !== "undefined") {
      await this.passwordInput.type(password);
    }
    if (typeof address !== "undefined") {
      await this.addressInput.type(address);
    }
    if (typeof city !== "undefined") {
      await this.cityInput.type(city);
    }
    await this.stateSelector.selectOption("1");
    if (typeof zipCode !== "undefined") {
      await this.zipCode.type(zipCode.toString());
    }
    if (typeof mobilePhone !== "undefined") {
      await this.mobilePhone.type(mobilePhone.toString());
    }

    await this.submitButton.click();
  }

  async assertErrorAmount(amount: number) {
    await expect(this.errorMessage).toContainText(`${amount} error`);
  }
}
