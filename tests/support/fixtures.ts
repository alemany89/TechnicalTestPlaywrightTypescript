import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { YourCartPage } from '../pages/YourCartPage';
import { CheckoutYourInformationPage } from '../pages/CheckoutYourInformationPage';
import { CheckoutOverview } from '../pages/CheckoutOverview';
import { CheckoutComplete } from '../pages/CheckoutComplete';

type PageFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  yourCartPage: YourCartPage;
  checkoutYourInformationPage: CheckoutYourInformationPage;
  checkoutOverview: CheckoutOverview;
  checkoutComplete: CheckoutComplete;
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
});

export { expect };
