import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class AboutPage extends CommonPage {
  constructor(page: Page) {
	super(page);
  }

  async waitForAboutPageToLoad() {
	await this.page.waitForSelector(".MuiTypography-root.MuiTypography-h1.css-152qxt", {
	  state: "attached",
	});
  }

  async getAboutText() {
	const aboutTextLocator = this.page.locator(".MuiTypography-root.MuiTypography-h1.css-152qxt");
	return this.getText(aboutTextLocator);
  }

}
