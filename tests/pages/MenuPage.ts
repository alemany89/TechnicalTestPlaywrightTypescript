import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class MenuPage extends CommonPage {
  private static readonly MENU_BUTTON_SELECTOR = "#react-burger-menu-btn";
  private static readonly ABOUT_LINK_SELECTOR = "[data-test='about-sidebar-link']";

  constructor(page: Page) {
    super(page);
  }

  async clickOnMenuButton() {
    await this.page.locator(MenuPage.MENU_BUTTON_SELECTOR).click();
  }

  async clickOnAboutLink() {
    await this.page.locator(MenuPage.ABOUT_LINK_SELECTOR).click();
  }
}
