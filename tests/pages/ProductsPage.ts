import { expect, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class ProductsPage extends CommonPage {

  constructor(page: Page) {
    super(page);
  }

  async isLoaded(): Promise<boolean> {
    const titleProductsPage = this.page.locator("[data-test='title']");
    return await titleProductsPage.isVisible();
  }

}
