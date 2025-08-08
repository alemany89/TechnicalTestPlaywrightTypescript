import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class CheckoutCompletePage extends CommonPage {
  private static readonly COMPLETE_MESSAGE_HEADER_SELECTOR =
    "[data-test='complete-header']";
  private static readonly COMPLETE_ICON_SELECTOR = "[data-test='pony-express']";

  constructor(page: Page) {
    super(page);
  }

  async waitForCheckoutCompleteToLoad() {
    await this.page.waitForSelector(
      CheckoutCompletePage.COMPLETE_ICON_SELECTOR,
      {
        state: "attached",
      }
    );
  }

  async getCompletionMessage(): Promise<string> {
    await this.waitForCheckoutCompleteToLoad();
    return await this.getText(
      this.page.locator(CheckoutCompletePage.COMPLETE_MESSAGE_HEADER_SELECTOR)
    );
  }
}
