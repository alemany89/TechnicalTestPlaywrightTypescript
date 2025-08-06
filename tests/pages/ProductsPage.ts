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

  	sortProductsAlphabetically() {
		const sortButton = this.page.locator("[data-test='product-sort-container']");
		return sortButton.selectOption({ label: "Name (A to Z)" });
	}

  async sortProductsByPriceInDescendingOrder() {
		const sortButton = this.page.locator("[data-test='product-sort-container']");
		return sortButton.selectOption({ label: "Price (high to low)" });
	}

  async sortProductsByPriceInAscendingOrder() {
		const sortButton = this.page.locator("[data-test='product-sort-container']");
		return sortButton.selectOption({ label: "Price (low to high)" });
	}

  async sortProductsReverseAlphabetically() {
    const sortButton = this.page.locator("[data-test='product-sort-container']");
    return sortButton.selectOption({ label: "Name (Z to A)" });
  }

  getProductsNames() {
		return this.page.locator("[data-test='inventory-item-name']").allTextContents();
	}

  getProductPrices() {
    return this.page.locator("[data-test='inventory-item-price']").allTextContents();
  }

}
