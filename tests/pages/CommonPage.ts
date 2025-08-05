import { Locator, Page } from "@playwright/test";

export class CommonPage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async click(selector: string) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async fill(selector: string, value: string) {
    await this.page.waitForSelector(selector);
    await this.page.fill(selector, value);
  }

  async getText(locator: Locator): Promise<string> {
    await locator.waitFor();
    return (await locator.textContent()) || "";
  }
}
