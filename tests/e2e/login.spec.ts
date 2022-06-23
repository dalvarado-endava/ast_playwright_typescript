import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";

test.describe.parallel("Login flow", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.visit();
    await homePage.clickLogin();
  });

  test("Negative scenario - invalid email", async ({ page }) => {
    await loginPage.login("invalid email", "password");
    await loginPage.assertErrorMessage("email");
  });
  test("Negative scenario - invalid password", async ({ page }) => {
    await loginPage.login("valid@email.com", "aaa");
    await loginPage.assertErrorMessage("password");
  });
  test("Negative scenario - authentication failed", async ({ page }) => {
    await loginPage.login("valid@email.com", "validPassword");
    await loginPage.assertErrorMessage("authentication");
  });

  test("Positive scenario - valid username and password", async ({ page }) => {
    await loginPage.login("testafloyd@gmail.com", "asdasd1234");
    const successLogin = await page.locator("h1.page-heading");
    await expect(successLogin).toContainText("My account");
  });
});
