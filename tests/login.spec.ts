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

  test("Unsuccessful login with invalid username and password", async ({
    loginPage,
  }) => {
    await test.step("When I login with invalid credentials", async () => {
      await loginPage.login("wrongLuisUser", "wrongPasswordLuis");
    });

    await test.step("Then I should see an error message", async () => {
      const expectedErrorMessage =
        "Epic sadface: Username and password do not match any user in this service";
      expect(await loginPage.getErrorMessage()).toContain(expectedErrorMessage);
    });

    await test.step("And I should still be on the login page", async () => {
      expect(await loginPage.isLoaded()).toBeTruthy();
    });
  });

  test("Unsuccessful login with empty username", async ({ loginPage }) => {
    await test.step("When I login with empty credentials", async () => {
      await loginPage.login("", "aaa");
    });

    await test.step("Then I should see an error message refering to the username", async () => {
      const expectedErrorMessage = "Epic sadface: Username is required";
      expect(await loginPage.getErrorMessage()).toContain(expectedErrorMessage);
    });

    await test.step("And I should still be on the login page", async () => {
      expect(await loginPage.isLoaded()).toBeTruthy();
    });
  });
});
