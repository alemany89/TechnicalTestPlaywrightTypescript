import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class CheckoutOverviewPage extends CommonPage {
  private static readonly INVENTORY_ITEM_SELECTOR = "[data-test='inventory-item']";
  private static readonly FINISH_BUTTON_SELECTOR = "[data-test='finish']";

  constructor(page: Page) {
    super(page);
  }

  async waitForCheckoutOverviewToLoad() {
    await this.page.waitForSelector(CheckoutOverviewPage.INVENTORY_ITEM_SELECTOR, {
      state: "attached",
    });
  }

  async clickFinishButton() {
    await this.page.locator(CheckoutOverviewPage.FINISH_BUTTON_SELECTOR).click();
  }
}
