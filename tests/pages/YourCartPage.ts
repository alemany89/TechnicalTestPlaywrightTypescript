import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class YourCartPage extends CommonPage {
  constructor(page: Page) {
    super(page);
  }

  async waitForCartInfoToLoad() {
    await this.page.waitForSelector("[data-test='inventory-item']", {
      state: "attached",
    });
  }

  async clickOnCheckoutButton() {
    const checkoutButton = this.page.locator("[data-test='checkout']");
    return checkoutButton.click();
  }
}
