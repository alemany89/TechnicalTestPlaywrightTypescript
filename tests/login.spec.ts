import { expect, test } from "./support/fixtures";

test.describe("Login Feature", () => {
  test.beforeEach(async ({ loginPage }) => {
    await test.step("Given I am on the login page", async () => {
      await loginPage.navigate();
    });
  });

  test("Successful login with valid username and password", async ({
    loginPage,
    productsPage,
  }) => {
    await test.step("When I login with valid credentials", async () => {
      await loginPage.login("standard_user", "secret_sauce");
    });

    await test.step("Then I should see the products page", async () => {
      expect(await productsPage.isLoaded()).toBeTruthy();
    });
  });
});