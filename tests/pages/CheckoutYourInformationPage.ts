import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class CheckoutYourInformationPage extends CommonPage {
  constructor(page: Page) {
	super(page);
  }

  async waitForCheckoutInfoToLoad() {
	await this.page.waitForSelector("[data-test='checkout_info']", {
	  state: "attached",
	});
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
	const firstNameInput = this.page.locator("#first-name");
	const lastNameInput = this.page.locator("#last-name");
	const postalCodeInput = this.page.locator("#postal-code");
	await firstNameInput.fill(firstName);
	await lastNameInput.fill(lastName);
	await postalCodeInput.fill(postalCode);
  }

  async clickContinueButton() {
	const continueButton = this.page.locator("[data-test='continue']");
	return continueButton.click();
  }

}
