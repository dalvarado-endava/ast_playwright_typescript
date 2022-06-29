import { test, expect } from "@playwright/test";

import { LoginPage } from "../../page-objects/LoginPage";
import { HomePage } from "../../page-objects/HomePage";
import { LoginError, NavbarButton } from "../../helpers/Enums";
import { Navbar } from "../../page-objects/components/Navbar";
import { RegisterPage } from "../../page-objects/RegisterPage";

test.describe.parallel("Register flow", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let registerPage: RegisterPage;
  let navBar: Navbar;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    navBar = new Navbar(page);
    registerPage = new RegisterPage(page);
    await homePage.visitHome();
    await navBar.clickOn(NavbarButton.SIGNIN);
  });

  test("Negative scenario - Invalid email ", async ({ page }) => {
    await loginPage.createAccount("invalidemail");
    await loginPage.assertErrorMessage(LoginError.EMAIL);
  });

  test("Negative scenario - Valid email but empty register form", async ({
    page,
  }) => {
    await loginPage.createAccount("valid@email.newtest");
    await registerPage.fillRegisterForm();
    await registerPage.assertErrorAmount(7);
  });
  test.skip("", async ({ page }) => {});
});
