import { expect, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class ProductsPage extends CommonPage {
  private static readonly INVENTORY_LIST_SELECTOR = "[data-test='inventory-list']";
  private static readonly CART_ICON_SELECTOR = "[data-test='shopping-cart-link']";
  private static readonly SORT_DROPDOWN_SELECTOR = "[data-test='product-sort-container']";
  private static readonly PRODUCT_NAME_SELECTOR = "[data-test='inventory-item-name']";
  private static readonly PRODUCT_PRICE_SELECTOR = "[data-test='inventory-item-price']";
  private static readonly TITLE_SELECTOR = "[data-test='title']";

  constructor(page: Page) {
    super(page);
  }

  async waitForProductsToLoad() {
    await this.page.waitForSelector(ProductsPage.INVENTORY_LIST_SELECTOR, {
      state: "attached",
    });
  }

  addProductToCart(productName: string) {
    const formattedName = productName.replace(/\s+/g, "-").toLowerCase();
    const productLocator = this.page.locator(
      `button[data-test='add-to-cart-${formattedName}']`
    );
    return productLocator.click();
  }

  clickToCartIcon() {
    return this.page.locator(ProductsPage.CART_ICON_SELECTOR).click();
  }

  sortProductsAlphabetically() {
    return this.page
      .locator(ProductsPage.SORT_DROPDOWN_SELECTOR)
      .selectOption({ label: "Name (A to Z)" });
  }

  async sortProductsByPriceInDescendingOrder() {
    return this.page
      .locator(ProductsPage.SORT_DROPDOWN_SELECTOR)
      .selectOption({ label: "Price (high to low)" });
  }

  async sortProductsByPriceInAscendingOrder() {
    return this.page
      .locator(ProductsPage.SORT_DROPDOWN_SELECTOR)
      .selectOption({ label: "Price (low to high)" });
  }

  async sortProductsReverseAlphabetically() {
    return this.page
      .locator(ProductsPage.SORT_DROPDOWN_SELECTOR)
      .selectOption({ label: "Name (Z to A)" });
  }

  getProductsNames() {
    return this.page.locator(ProductsPage.PRODUCT_NAME_SELECTOR).allTextContents();
  }

  getProductPrices() {
    return this.page.locator(ProductsPage.PRODUCT_PRICE_SELECTOR).allTextContents();
  }

  async isLoaded() {
    expect(
      await this.page.locator(ProductsPage.TITLE_SELECTOR).isVisible()
    ).toBeTruthy();
  }
}
