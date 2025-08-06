import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class MenuPage extends CommonPage {
  constructor(page: Page) {
	super(page);
  }

  async clickOnMenuButton() {
	const menuButton = this.page.locator("#react-burger-menu-btn");
	return menuButton.click();
  }

  async clickOnAboutLink() {
	const aboutLink = this.page.locator("[data-test='about-sidebar-link']");
	return aboutLink.click();
  }

}
