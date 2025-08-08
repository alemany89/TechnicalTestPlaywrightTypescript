import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class AboutPage extends CommonPage {
  private static readonly ABOUT_TITLE_SELECTOR = ".MuiTypography-root.MuiTypography-h1.css-152qxt";

  constructor(page: Page) {
    super(page);
  }

  async waitForAboutPageToLoad() {
    await this.page.waitForSelector(AboutPage.ABOUT_TITLE_SELECTOR, {
      state: "attached",
    });
  }

  async getAboutText() {
    return this.getText(this.page.locator(AboutPage.ABOUT_TITLE_SELECTOR));
  }
}
