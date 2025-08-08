import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class CheckoutYourInformationPage extends CommonPage {
  private static readonly CHECKOUT_INFO_SECTION_SELECTOR = "[data-test='checkout_info']";
  private static readonly FIRST_NAME_INPUT_SELECTOR = "#first-name";
  private static readonly LAST_NAME_INPUT_SELECTOR = "#last-name";
  private static readonly POSTAL_CODE_INPUT_SELECTOR = "#postal-code";
  private static readonly CONTINUE_BUTTON_SELECTOR = "[data-test='continue']";

  constructor(page: Page) {
    super(page);
  }

  async waitForCheckoutInfoToLoad() {
    await this.page.waitForSelector(
      CheckoutYourInformationPage.CHECKOUT_INFO_SECTION_SELECTOR,
      { state: "attached" }
    );
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator(CheckoutYourInformationPage.FIRST_NAME_INPUT_SELECTOR).fill(firstName);
    await this.page.locator(CheckoutYourInformationPage.LAST_NAME_INPUT_SELECTOR).fill(lastName);
    await this.page.locator(CheckoutYourInformationPage.POSTAL_CODE_INPUT_SELECTOR).fill(postalCode);
  }

  async clickContinueButton() {
    await this.page.locator(CheckoutYourInformationPage.CONTINUE_BUTTON_SELECTOR).click();
  }
}
