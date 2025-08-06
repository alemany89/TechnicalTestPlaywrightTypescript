import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class CheckoutOverview extends CommonPage {
  constructor(page: Page) {
	super(page);
  }

  async waitForCheckoutOverviewToLoad() {
	await this.page.waitForSelector("[data-test='inventory-item']", {
	  state: "attached",
	});
  }

  async clickFinishButton() {
	const finishButton = this.page.locator("[data-test='finish']");
	return finishButton.click();
  }

}
