import { test as testBase, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { YourCartPage } from "../pages/YourCartPage";
import { CheckoutYourInformationPage } from "../pages/CheckoutYourInformationPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import { MenuPage } from "../pages/MenuPage";
import { AboutPage } from "../pages/AboutPage";
import { PetService } from "../../src/services/PetService";
import { UserService } from "../../src/services/UserService";

type ApiFixtures = {
  petService: PetService;
  userService: UserService;
};

type PageFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  yourCartPage: YourCartPage;
  checkoutYourInformationPage: CheckoutYourInformationPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  menuPage: MenuPage;
  aboutPage: AboutPage;
};

export const test = testBase.extend<PageFixtures & ApiFixtures>({
  petService: async ({ request }, use) => {
    const service = new PetService(request, true);
    await use(service);
  },
  userService: async ({ request }, use) => {
    const service = new UserService(request);
    await use(service);
  },
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
  checkoutOverviewPage: async ({ page }, use) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await use(checkoutOverviewPage);
  },
  checkoutCompletePage: async ({ page }, use) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
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
