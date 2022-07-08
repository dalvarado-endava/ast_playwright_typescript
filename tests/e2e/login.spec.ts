import { test, expect } from "@playwright/test";
import { LoginError, NavbarButton } from "../../helpers/Enums";
import { AccountPage } from "../../page-objects/Account/AccountPage";
import { Navbar } from "../../page-objects/components/Navbar";
import { HomePage } from "../../page-objects/Home/HomePage";
import { LoginPage } from "../../page-objects/Login/LoginPage";

test.describe.parallel("Login flow", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let accountPage: AccountPage;
  let navBar: Navbar;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    accountPage = new AccountPage(page);
    navBar = new Navbar(page);
    await homePage.visitHome();
    await navBar.clickOn(NavbarButton.SIGNIN);
  });

  test("Negative scenario - invalid email", async ({ page }) => {
    await loginPage.login("invalid email", "password");
    await loginPage.assertErrorMessage(LoginError.EMAIL);
  });
  test("Negative scenario - invalid password", async ({ page }) => {
    await loginPage.login("valid@email.com", "aaa");
    await loginPage.assertErrorMessage(LoginError.PASSWORD);
  });
  test("Negative scenario - authentication failed", async ({ page }) => {
    await loginPage.login("valid@email.com", "validPassword");
    await loginPage.assertErrorMessage(LoginError.AUTHENTICATION);
  });

  test("Positive scenario - valid username and password", async ({ page }) => {
    await loginPage.login("testafloyd@gmail.com", "asdasd1234");
    await accountPage.assertSuccess();
  });
});
