import { Locator, Page } from "@playwright/test";

export class CommonPage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }


  async getText(locator: Locator): Promise<string> {
    await locator.waitFor();
    return (await locator.textContent()) || "";
  }
}
