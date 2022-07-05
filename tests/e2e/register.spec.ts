import { test, expect } from "@playwright/test";

import { LoginPage } from "../../page-objects/LoginPage";
import { HomePage } from "../../page-objects/HomePage";
import { LoginError, NavbarButton, RegisterError } from "../../helpers/Enums";
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
  test("Negative scenario - fill form with empty phone", async ({ page }) => {
    await loginPage.createAccount("valid@email.newtest");
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
    await loginPage.createAccount("valid@email.newtest");
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
    await loginPage.createAccount("valid@email.newtest");
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
    await loginPage.createAccount("valid@email.newtest");
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
    await loginPage.createAccount("valid@email.newtest");
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
    await loginPage.createAccount("valid@email.newtest");
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
    await loginPage.createAccount("valid@email.newtest");
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

  test.skip("Positive scenario - Successful register", async ({ page }) => {});
});
