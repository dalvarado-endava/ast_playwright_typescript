import { test, expect } from "@playwright/test";
import {
  AccountButton,
  NavbarButton,
  RegisterError,
} from "../../helpers/Enums";
import { AccountPage } from "../../page-objects/Account/AccountPage";
import { MyAddressesPage } from "../../page-objects/Account/MyAddressesPage";
import { Navbar } from "../../page-objects/components/Navbar";
import { HomePage } from "../../page-objects/Home/HomePage";
import { LoginPage } from "../../page-objects/Login/LoginPage";
import { RegisterPage } from "../../page-objects/Register/RegisterPage";
import * as addressData from "../../testdata//addressData.json";
import { RegisteredUserData } from "../../testdata/UserData";

test.describe("Update address", () => {
  let homepage: HomePage;
  let loginpage: LoginPage;
  let navBar: Navbar;
  let accountPage: AccountPage;
  let myAddressPage: MyAddressesPage;
  let registerAddressPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    loginpage = new LoginPage(page);
    navBar = new Navbar(page);
    accountPage = new AccountPage(page);
    myAddressPage = new MyAddressesPage(page);
    registerAddressPage = new RegisterPage(page);

    await homepage.visit();
    await navBar.clickOn(NavbarButton.SIGNIN);
    await loginpage.login(
      RegisteredUserData.registeredEmail,
      RegisteredUserData.password
    );
    await accountPage.clickOn(AccountButton.ADDRESSES);
  });

  test.skip("Positive scenario - added new address", async ({ page }) => {
    await myAddressPage.addNewAddress();
    await registerAddressPage.fillNewAddressForm(
      addressData.address,
      addressData.city,
      addressData.zipcode,
      addressData.phone,
      addressData.addressAlias
    );
    await myAddressPage.waitForTitle();
    const newAddressName = await page.locator(
      `text="${addressData.addressAlias}"`
    );
    await expect(newAddressName).toBeVisible();
  });

  test("Negative scenario - Incomplete address form: no address", async ({
    page,
  }) => {
    await myAddressPage.addNewAddress();
    await registerAddressPage.fillNewAddressForm(
      undefined,
      addressData.city,
      addressData.zipcode,
      addressData.phone,
      addressData.addressAlias
    );
    await registerAddressPage.assertError(RegisterError.ADDRESS);
  });
  test("Negative scenario - Incomplete address form: no city", async ({
    page,
  }) => {
    await myAddressPage.addNewAddress();
    await registerAddressPage.fillNewAddressForm(
      addressData.address,
      undefined,
      addressData.zipcode,
      addressData.phone,
      addressData.addressAlias
    );
    await registerAddressPage.assertError(RegisterError.CITY);
  });
  test("Negative scenario - Incomplete address form: no zipcode", async ({
    page,
  }) => {
    await myAddressPage.addNewAddress();
    await registerAddressPage.fillNewAddressForm(
      addressData.address,
      addressData.city,
      undefined,
      addressData.phone,
      addressData.addressAlias
    );
    await registerAddressPage.assertError(RegisterError.ZIPCODE);
  });
  test("Negative scenario - Incomplete address form: no phone", async ({
    page,
  }) => {
    await myAddressPage.addNewAddress();
    await registerAddressPage.fillNewAddressForm(
      addressData.address,
      addressData.city,
      addressData.zipcode,
      undefined,
      addressData.addressAlias
    );
    await registerAddressPage.assertError(RegisterError.PHONE);
  });
  test("Negative scenario - Incomplete address form: no alias", async ({
    page,
  }) => {
    await myAddressPage.addNewAddress();
    await registerAddressPage.fillNewAddressForm(
      addressData.address,
      addressData.city,
      addressData.zipcode,
      addressData.phone
    );
    await registerAddressPage.assertError(RegisterError.ALIAS);
  });
});
