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

  async waitForProductsToLoad() {
    await this.page.waitForSelector("[data-test='inventory-list']", { state: "attached" });
  }

    addProductToCart(productName: string) {
      const productNameToSelectorFormat = productName.replace(/\s+/g, '-').toLowerCase();
      const productLocator = this.page.locator(`button[data-test='add-to-cart-${productNameToSelectorFormat}']`);

      return productLocator.click();
  }

  	clickToCartIcon() {
		const cartIcon = this.page.locator("[data-test='shopping-cart-link']");
		return cartIcon.click();
	}

}
