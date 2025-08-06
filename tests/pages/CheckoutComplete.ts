import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class CheckoutComplete extends CommonPage {
  constructor(page: Page) {
	super(page);
  }

  async waitForCheckoutCompleteToLoad() {
	await this.page.waitForSelector("[data-test='pony-express']", {
	  state: "attached",
	});
  }
  async getCompletionMessage(): Promise<string> {
	const messageLocator = this.page.locator("[data-test='complete-header']");
	return this.getText(messageLocator);
  }

}
