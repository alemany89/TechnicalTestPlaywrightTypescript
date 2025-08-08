import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class YourCartPage extends CommonPage {
  private static readonly CART_ITEM_SELECTOR = "[data-test='inventory-item']";
  private static readonly CHECKOUT_BUTTON_SELECTOR = "[data-test='checkout']";

  constructor(page: Page) {
    super(page);
  }

  async waitForCartInfoToLoad() {
    await this.page.waitForSelector(YourCartPage.CART_ITEM_SELECTOR, {
      state: "attached",
    });
  }

  async clickOnCheckoutButton() {
    await this.page.locator(YourCartPage.CHECKOUT_BUTTON_SELECTOR).click();
  }
}
