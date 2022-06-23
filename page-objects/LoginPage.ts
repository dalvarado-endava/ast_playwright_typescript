import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  readonly registerInput: Locator;
  readonly registerButton: Locator;

  readonly alertMessage: Locator;

  constructor(page: Page) {
    this.page = page;
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

  async assertErrorMessage(type: string) {
    switch (type) {
      case "email": {
        await expect(this.alertMessage).toContainText("Invalid email address");
        break;
      }
      case "password": {
        await expect(this.alertMessage).toContainText("Invalid password");
        break;
      }
      case "authentication": {
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
