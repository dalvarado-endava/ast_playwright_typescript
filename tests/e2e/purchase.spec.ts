import { test, expect } from "@playwright/test";
import { NavbarButton } from "../../helpers/Enums";
import { CheckoutAddressPage } from "../../page-objects/Checkout/CheckoutAddressPage";
import { CheckoutConfirmationPage } from "../../page-objects/Checkout/CheckoutConfirmationPage";
import { CheckoutPaymentPage } from "../../page-objects/Checkout/CheckoutPaymentPage";
import { CheckoutShippingPage } from "../../page-objects/Checkout/CheckoutShippingPage";
import { CheckoutSummaryPage } from "../../page-objects/Checkout/CheckoutSummaryPage";
import { CheckoutFooter } from "../../page-objects/Checkout/components/CheckoutFooter";
import { AddToCartPopUp } from "../../page-objects/components/AddToCartPopUp";
import { Navbar } from "../../page-objects/components/Navbar";
import { HomePage } from "../../page-objects/Home/HomePage";
import { LoginPage } from "../../page-objects/Login/LoginPage";
import { ProductListPage } from "../../page-objects/Product/ProductListPage";
import { ProductPage } from "../../page-objects/Product/ProductPage";
import { RegisteredUserData } from "../../testdata/UserData";

test.describe("Purchase flow", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let productListPage: ProductListPage;
  let navBar: Navbar;
  let addToCartPopup: AddToCartPopUp;

  //checkout
  let checkoutFooter: CheckoutFooter;
  let checkoutSummaryPage: CheckoutSummaryPage;
  let checkoutAddressPage: CheckoutAddressPage;
  let checkoutShippingPage: CheckoutShippingPage;
  let checkoutPaymentPage: CheckoutPaymentPage;
  let checkoutConfirmationPage: CheckoutConfirmationPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    productListPage = new ProductListPage(page);
    navBar = new Navbar(page);
    addToCartPopup = new AddToCartPopUp(page);
    checkoutFooter = new CheckoutFooter(page);
    checkoutSummaryPage = new CheckoutSummaryPage(page);
    checkoutAddressPage = new CheckoutAddressPage(page);
    checkoutShippingPage = new CheckoutShippingPage(page);
    checkoutPaymentPage = new CheckoutPaymentPage(page);
    checkoutConfirmationPage = new CheckoutConfirmationPage(page);

    await homePage.visit();
    await navBar.clickOn(NavbarButton.SIGNIN);
    await loginPage.login(
      RegisteredUserData.registeredEmail,
      RegisteredUserData.password
    );
    await navBar.clickOn(NavbarButton.WOMEN_TAB);
  });

  test("Positive Scenario - Successful checkout with check", async ({
    page,
  }) => {
    await productListPage.waitForList();
    await productListPage.clickOnProduct();
    await productPage.waitVisibleProductName();
    await productPage.addToCart();
    await addToCartPopup.assertPopUpVisible();
    await addToCartPopup.checkout();
    await checkoutSummaryPage.assertAvailability();
    await checkoutFooter.clickOnCheckout();
    await checkoutAddressPage.addMessage("message");
    await checkoutFooter.clickOnCheckout();
    await checkoutShippingPage.acceptTerms();
    await checkoutFooter.clickOnCheckout();
    await checkoutPaymentPage.payByCheck();
    await checkoutPaymentPage.assertConfirmation("check");
    await checkoutPaymentPage.submitOrder();
    await checkoutConfirmationPage.assertConfirmation("check");
  });
  test("Positive Scenario - Successful checkout with bank", async ({
    page,
  }) => {
    await productListPage.waitForList();
    await productListPage.clickOnProduct();
    await productPage.waitVisibleProductName();
    await productPage.addToCart();
    await addToCartPopup.assertPopUpVisible();
    await addToCartPopup.checkout();
    await checkoutSummaryPage.assertAvailability();
    await checkoutFooter.clickOnCheckout();
    await checkoutAddressPage.addMessage("message");
    await checkoutFooter.clickOnCheckout();
    await checkoutShippingPage.acceptTerms();
    await checkoutFooter.clickOnCheckout();
    await checkoutPaymentPage.payByBank();
    await checkoutPaymentPage.assertConfirmation("bank");
    await checkoutPaymentPage.submitOrder();
    await checkoutConfirmationPage.assertConfirmation("bank");
  });
  test("Negative Scenario - Do not accept terms of service", async ({
    page,
  }) => {
    await productListPage.waitForList();
    await productListPage.clickOnProduct();
    await productPage.waitVisibleProductName();
    await productPage.addToCart();
    await addToCartPopup.assertPopUpVisible();
    await addToCartPopup.checkout();
    await checkoutSummaryPage.assertAvailability();
    await checkoutFooter.clickOnCheckout();
    await checkoutAddressPage.addMessage("message");
    await checkoutFooter.clickOnCheckout();
    await checkoutShippingPage.waitForTerms();
    await checkoutFooter.clickOnCheckout();
    await checkoutShippingPage.assertErrorVisible();
  });

  test("Delete cart scenario", async ({ page }) => {
    await productListPage.waitForList();
    await productListPage.clickOnProduct();
    await productPage.waitVisibleProductName();
    await productPage.addToCart();
    await addToCartPopup.assertPopUpVisible();
    await addToCartPopup.checkout();
    await checkoutSummaryPage.assertAvailability();
    await checkoutSummaryPage.deleteCart();
    await checkoutSummaryPage.assertEmptyCart();
  });
});
