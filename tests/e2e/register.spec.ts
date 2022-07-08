import { test, expect } from "@playwright/test";

import { LoginPage } from "../../page-objects/Login/LoginPage";
import { HomePage } from "../../page-objects/Home/HomePage";
import { LoginError, NavbarButton, RegisterError } from "../../helpers/Enums";
import { Navbar } from "../../page-objects/components/Navbar";
import { RegisterPage } from "../../page-objects/Register/RegisterPage";
import { AccountPage } from "../../page-objects/Account/AccountPage";
import { getRandomEmail } from "../../helpers/data-helpers";

test.describe.parallel("Register flow", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let registerPage: RegisterPage;
  let accountPage: AccountPage;
  let navBar: Navbar;

  let randomEmail: string;
  test.beforeAll(async ({ browser }) => {
    randomEmail = await getRandomEmail();
  });

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
    accountPage = new AccountPage(page);
    navBar = new Navbar(page);

    await homePage.visitHome();
    await navBar.clickOn(NavbarButton.SIGNIN);
  });

  test("Negative scenario - Invalid email ", async ({ page }) => {
    await loginPage.createAccount("invalid-at-email-dot-com");
    await loginPage.assertErrorMessage(LoginError.EMAIL);
  });

  test("Negative scenario - Valid email but empty register form", async ({
    page,
  }) => {
    await loginPage.createAccount(randomEmail);
    await registerPage.fillRegisterForm();
    await registerPage.assertErrorAmount(7);
  });
  test("Negative scenario - fill form with empty phone", async ({ page }) => {
    await loginPage.createAccount(randomEmail);
    await registerPage.fillRegisterForm(
      "name",
      "lastname",
      "password",
      "some address",
      "some city",
      11111
    );
    await registerPage.assertErrorAmount(1);
    await registerPage.assertError(RegisterError.PHONE);
  });
  test("Negative scenario - fill form with empty first name", async ({
    page,
  }) => {
    await loginPage.createAccount(randomEmail);
    await registerPage.fillRegisterForm(
      undefined,
      "lastname",
      "password",
      "some address",
      "some city",
      11111,
      1111111111
    );
    await registerPage.assertErrorAmount(1);
    await registerPage.assertError(RegisterError.FIRSTNAME);
  });
  test("Negative scenario - fill form with empty last name", async ({
    page,
  }) => {
    await loginPage.createAccount(randomEmail);
    await registerPage.fillRegisterForm(
      "name",
      undefined,
      "password",
      "some address",
      "some city",
      11111,
      1111111111
    );
    await registerPage.assertErrorAmount(1);
    await registerPage.assertError(RegisterError.LASTNAME);
  });
  test("Negative scenario - fill form with empty password", async ({
    page,
  }) => {
    await loginPage.createAccount(randomEmail);
    await registerPage.fillRegisterForm(
      "name",
      "lastname",
      undefined,
      "some address",
      "some city",
      11111,
      1111111111
    );
    await registerPage.assertErrorAmount(1);
    await registerPage.assertError(RegisterError.PASSWORD);
  });
  test("Negative scenario - fill form with empty address", async ({ page }) => {
    await loginPage.createAccount(randomEmail);
    await registerPage.fillRegisterForm(
      "name",
      "lastname",
      "password",
      undefined,
      "some city",
      11111,
      1111111111
    );
    await registerPage.assertErrorAmount(1);
    await registerPage.assertError(RegisterError.ADDRESS);
  });
  test("Negative scenario - fill form with empty city", async ({ page }) => {
    await loginPage.createAccount(randomEmail);
    await registerPage.fillRegisterForm(
      "name",
      "lastname",
      "password",
      "some address",
      undefined,
      11111,
      1111111111
    );
    await registerPage.assertErrorAmount(1);
    await registerPage.assertError(RegisterError.CITY);
  });
  test("Negative scenario - fill form with empty zipcode", async ({ page }) => {
    await loginPage.createAccount(randomEmail);
    await registerPage.fillRegisterForm(
      "name",
      "lastname",
      "password",
      "some address",
      "some city",
      undefined,
      1111111111
    );
    await registerPage.assertErrorAmount(1);
    await registerPage.assertError(RegisterError.ZIPCODE);
  });

  test("Positive scenario - Successful register", async ({ page }) => {
    await loginPage.createAccount(randomEmail);
    await registerPage.fillRegisterForm(
      "name",
      "lastname",
      "password",
      "some address",
      "some city",
      11111,
      1111111111
    );
    await accountPage.assertSuccess();
  });
});
