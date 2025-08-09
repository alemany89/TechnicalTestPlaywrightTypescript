import { expect, test } from "./support/fixtures";

test.describe("Products Feature", () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await productsPage.waitForProductsToLoad();
  });

  test("Adding products to the basket increases the cart items counter", async ({
    productsPage
  }) => {
    const expectedNumberOfItemsInCart = 2;
    await test.step("Given I am on the products page", async () => {
      expect(await productsPage.isLoaded());
    });

    await test.step("When I add a product to the cart", async () => {
      await productsPage.addProductToCart("Sauce Labs Backpack");
    });

    await test.step("And I add a second product to the cart", async () => {
      await productsPage.addProductToCart("Sauce Labs Bike Light");
    });

    await test.step(`Then the cart count should be ${expectedNumberOfItemsInCart}`, async () => {
      expect(await productsPage.getCartItemsCount()).toBe(expectedNumberOfItemsInCart);
    });
  }); 

  test("Sorting products from Z to A", async ({ productsPage }) => {
    let expectedProductsAfterSorting: string[];

    await test.step("Given I am on the products page", async () => {
      expect(await productsPage.isLoaded());
    });

    await test.step("When I get the current list of products names before sorting", async () => {
      await productsPage.sortProductsAlphabetically();
      const productsBeforeSorting = await productsPage.getProductsNames();
      expectedProductsAfterSorting = [...productsBeforeSorting].reverse();
    });

    await test.step("And I sort the products from Z to A", async () => {
      await productsPage.sortProductsReverseAlphabetically();
    });

    await test.step("Then the products should be sorted in reverse alphabetical order", async () => {
      const productsAfterSorting = await productsPage.getProductsNames();
      expect(productsAfterSorting).toEqual(expectedProductsAfterSorting);
    });
  });

  test("Sorting products by price in ascending order", async ({
    productsPage,
  }) => {
    let expectedPricesAfterSorting: string[];

    await test.step("Given I am on the products page", async () => {
      expect(await productsPage.isLoaded());
    });

    await test.step("When I get the current list of products prices before sorting", async () => {
      const pricesBeforeSorting = await productsPage.getProductPrices();
      expectedPricesAfterSorting = pricesBeforeSorting
        .slice()
        .sort(
          (a, b) =>
            parseFloat(a.replace("$", "")) - parseFloat(b.replace("$", ""))
        );
    });

    await test.step("And I sort the products by price in ascending order", async () => {
      await productsPage.sortProductsByPriceInAscendingOrder();
    });

    await test.step("Then the products should be sorted by price in ascending order", async () => {
      const productsPriceAfterSorting = await productsPage.getProductPrices();
      expect(productsPriceAfterSorting).toEqual(expectedPricesAfterSorting);
    });
  });

  test("From product page i can access to about page", async ({
    productsPage,
    menuPage,
    aboutPage,
  }) => {
    await test.step("Given I am on the products page", async () => {
      expect(await productsPage.isLoaded());
    });

    await test.step("When I click on the about link", async () => {
      await menuPage.clickOnMenuButton();
      await menuPage.clickOnAboutLink();
    });
    await test.step("Then I should see the about page", async () => {
      await aboutPage.waitForAboutPageToLoad();
      const aboutText = await aboutPage.getAboutText();
      expect(aboutText).toContain(
        "Build apps users love with AI-driven quality"
      );
    });
  });
});
