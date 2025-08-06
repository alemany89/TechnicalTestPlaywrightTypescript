import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { YourCartPage } from "../pages/YourCartPage";
import { CheckoutYourInformationPage } from "../pages/CheckoutYourInformationPage";
import { CheckoutOverview } from "../pages/CheckoutOverview";
import { CheckoutComplete } from "../pages/CheckoutComplete";
import { MenuPage } from "../pages/MenuPage";
import { AboutPage } from "../pages/AboutPage";

type PageFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  yourCartPage: YourCartPage;
  checkoutYourInformationPage: CheckoutYourInformationPage;
  checkoutOverview: CheckoutOverview;
  checkoutComplete: CheckoutComplete;
  menuPage: MenuPage;
  aboutPage: AboutPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
  yourCartPage: async ({ page }, use) => {
    const yourCartPage = new YourCartPage(page);
    await use(yourCartPage);
  },
  checkoutYourInformationPage: async ({ page }, use) => {
    const checkoutYourInformationPage = new CheckoutYourInformationPage(page);
    await use(checkoutYourInformationPage);
  },
  checkoutOverview: async ({ page }, use) => {
    const checkoutOverview = new CheckoutOverview(page);
    await use(checkoutOverview);
  },
  checkoutComplete: async ({ page }, use) => {
    const checkoutComplete = new CheckoutComplete(page);
    await use(checkoutComplete);
  },
  menuPage: async ({ page }, use) => {
    const menuPage = new MenuPage(page);
    await use(menuPage);
  },
  aboutPage: async ({ page }, use) => {
    const aboutPage = new AboutPage(page);
    await use(aboutPage);
  },
});

export { expect };
