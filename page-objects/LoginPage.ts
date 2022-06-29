import { Page, Locator, expect } from "@playwright/test";
import { LoginError } from "../helpers/Enums";
import { AbstractPage } from "./AbstractPage";

export class LoginPage extends AbstractPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  readonly registerInput: Locator;
  readonly registerButton: Locator;

  readonly alertMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#passwd");
    this.signInButton = page.locator("#SubmitLogin");

    this.registerInput = page.locator("#email_create");
    this.registerButton = page.locator("#SubmitCreate");
    this.alertMessage = page.locator(
      "//li[contains(text(),'Invalid email') or contains(text(),'Invalid password') or contains(text(),'Authentication')]"
    );
  }

  async login(email: string, password: string) {
    await this.emailInput.type(email);
    await this.passwordInput.type(password);
    await this.signInButton.click();
  }

  async createAccount(email: string) {
    await this.registerInput.type(email);
    await this.registerButton.click();
  }

  async assertErrorMessage(type: LoginError) {
    switch (type) {
      case LoginError.EMAIL: {
        await expect(this.alertMessage).toContainText("Invalid email address");
        break;
      }
      case LoginError.PASSWORD: {
        await expect(this.alertMessage).toContainText("Invalid password");
        break;
      }
      case LoginError.AUTHENTICATION: {
        await expect(this.alertMessage).toContainText("Authentication failed");
        break;
      }
      default: {
        await expect(this.alertMessage).not.toBeVisible();
        break;
      }
    }
  }
}
