import { Page, Locator, expect } from "@playwright/test";
import { RegisterError } from "../helpers/Enums";
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

  readonly errorAmount: Locator;
  readonly phoneErrorMessage: Locator;
  readonly lastnameErrorMessage: Locator;
  readonly firstnameErrorMessage: Locator;
  readonly passwordErrorMessage: Locator;
  readonly addressErrorMessage: Locator;
  readonly cityErrorMessage: Locator;
  readonly zipErrorMessage: Locator;
  readonly stateErrorMessage: Locator;
  readonly countryErrorMessage: Locator;

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

    //errorAmount
    this.errorAmount = page.locator(
      "//p[contains(text(),'There is') or contains(text(), 'There are')]"
    );

    //ERROR MESSAGES
    this.phoneErrorMessage = page.locator(
      "//li[contains(text(),'one phone number')]"
    );
    this.lastnameErrorMessage = page.locator(
      "//b[contains(text(),'lastname')]"
    );
    this.firstnameErrorMessage = page.locator(
      "//b[contains(text(),'firstname')]"
    );
    this.passwordErrorMessage = page.locator("//b[contains(text(),'passwd')]");
    this.addressErrorMessage = page.locator("//b[contains(text(),'address1')]");
    this.cityErrorMessage = page.locator("//b[contains(text(),'city')]");
    this.zipErrorMessage = page.locator(
      "//li[contains(text(),'The Zip/Postal code')]"
    );
    this.stateErrorMessage = page.locator(
      "text='This country requires you to choose a State'"
    );
    this.countryErrorMessage = page.locator("text='Country is invalid'");
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
    await expect(this.errorAmount).toContainText(`${amount} error`);
  }

  async assertError(error: RegisterError) {
    switch (error) {
      case RegisterError.PHONE:
        await expect(this.phoneErrorMessage).toBeVisible();
        break;
      case RegisterError.LASTNAME:
        await expect(this.lastnameErrorMessage).toBeVisible();
        break;
      case RegisterError.FIRSTNAME:
        await expect(this.firstnameErrorMessage).toBeVisible();
        break;
      case RegisterError.PASSWORD:
        await expect(this.passwordErrorMessage).toBeVisible();
        break;
      case RegisterError.ADDRESS:
        await expect(this.addressErrorMessage).toBeVisible();
        break;
      case RegisterError.CITY:
        await expect(this.cityErrorMessage).toBeVisible();
        break;
      case RegisterError.ZIPCODE:
        await expect(this.zipErrorMessage).toBeVisible();
        break;
      case RegisterError.STATE:
        await expect(this.stateErrorMessage).toBeVisible();
        break;
      case RegisterError.COUNTRY:
        await expect(this.countryErrorMessage).toBeVisible();
        break;

      default:
        throw new Error("This error does not exist");
    }
  }
}
