import { expect, test } from "./support/fixtures";

test.describe("Login Feature", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test("Successful login with valid username and password", async ({
    loginPage,
    productsPage,
  }) => {
    const successfulCredentials = {
      username: "standard_user",
      password: "secret_sauce",
    };
    const { username: successfulUsername, password: successfulPassword } =
      successfulCredentials;

    await test.step("Given I am on the login page", async () => {
      expect(await loginPage.isLoaded());
    });

    await test.step(`When I login with valid credentials: Username: "${successfulUsername}", Password: "${successfulPassword}"`, async () => {
      await loginPage.login(successfulUsername, successfulPassword);
    });

    await test.step("Then I should see the products page", async () => {
      expect(await productsPage.isLoaded());
    });
  });

  test("Unsuccessful login with invalid username and password", async ({
    loginPage,
  }) => {
    const wrongCredentials = {
      username: "wrongUser",
      password: "wrongPassword",
    };
    const { username: wrongUsername, password: wrongPassword } =
      wrongCredentials;

    await test.step("Given I am on the login page", async () => {
      expect(await loginPage.isLoaded());
    });

    await test.step(`When I login with invalid credentials: Username: "${wrongUsername}", Password: "${wrongPassword}"`, async () => {
      await loginPage.login(wrongUsername, wrongPassword);
    });

    await test.step("Then I should see an error message", async () => {
      const expectedErrorMessage =
        "Epic sadface: Username and password do not match any user in this service";
      expect(await loginPage.getErrorMessage()).toContain(expectedErrorMessage);
    });

    await test.step("And I should still be on the login page", async () => {
      expect(await loginPage.isLoaded());
    });
  });

  test("Unsuccessful login with empty username", async ({ loginPage }) => {
    const emptyUserCredentials = {
      username: "",
      password: "testEmptyUser",
    };
    const { username: emptyUsername, password } = emptyUserCredentials;

    await test.step("Given I am on the login page", async () => {
      expect(await loginPage.isLoaded());
    });

    await test.step(`When I login with empty username: Username: "${emptyUsername}", Password: "${password}"`, async () => {
      await loginPage.login(emptyUsername, password);
    });

    await test.step("Then I should see an error message refering to the username", async () => {
      const expectedErrorMessage = "Epic sadface: Username is required";
      expect(await loginPage.getErrorMessage()).toContain(expectedErrorMessage);
    });

    await test.step("And I should still be on the login page", async () => {
      expect(await loginPage.isLoaded());
    });
  });

  test("Unsuccessful login when using a locked user", async ({ loginPage }) => {
    const lockedUserCredentials = {
      username: "locked_out_user",
      password: "secret_sauce",
    };
    const { username: lockedUsername, password } = lockedUserCredentials;

    await test.step("Given I am on the login page", async () => {
      expect(await loginPage.isLoaded());
    });

    await test.step(`When I login with a locked user: Username: "${lockedUsername}", Password: "${password}"`, async () => {
      await loginPage.login(lockedUsername, password);
    });

    await test.step("Then I should see an error message", async () => {
      const expectedErrorMessage =
        "Epic sadface: Sorry, this user has been locked out.";
      expect(await loginPage.getErrorMessage()).toContain(expectedErrorMessage);
    });

    await test.step("And I should still be on the login page", async () => {
      expect(await loginPage.isLoaded());
      expect(false).toBe(true);
    });
  });
});
