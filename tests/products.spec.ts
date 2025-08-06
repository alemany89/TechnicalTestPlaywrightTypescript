import { expect, test } from "./support/fixtures";

test.describe("Products Feature", () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await test.step("Given I am on the products page", async () => {
      await loginPage.navigate();
      await loginPage.login("standard_user", "secret_sauce");
      await productsPage.waitForProductsToLoad();
    });
  });

  test("Buying a product successfully", async ({
    productsPage,
    yourCartPage,
    checkoutYourInformationPage,
    checkoutOverview,
    checkoutComplete,
  }) => {
    await test.step("When I add a product to the cart", async () => {
      await productsPage.addProductToCart("Sauce Labs Backpack");
    });

    await test.step("And I click on the cart icon", async ({}) => {
      await productsPage.clickToCartIcon();
    });

    await test.step("And I proceed to checkout", async () => {
      await yourCartPage.clickOnCheckoutButton();
    });

    await test.step("And I fill in the checkout information", async () => {
      await checkoutYourInformationPage.fillCheckoutInformation(
        "Luis",
        "Joaquin",
        "41008"
      );
    });

    await test.step("And I click on the continue button", async () => {
      await checkoutYourInformationPage.clickContinueButton();
    });

    await test.step("And I click on the finish button", async () => {
      await checkoutOverview.clickFinishButton();
    });

    await test.step("Then I should see the checkout completion message", async () => {
      const message = await checkoutComplete.getCompletionMessage();
      expect(message).toContain("Thank you for your order!");
    });
  });

  test("Sorting products from Z to A", async ({ productsPage }) => {
    let expectedProductsAfterSorting: string[];

    await test.step("When I get the current list of products names before sorting", async () => {
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

});
