import { ErrorUserDTOResponse } from "../src/dto/user/ErrorUserDTOResponse";
import { UserDTORequest } from "../src/dto/user/UserDTORequest";
import { expect, test } from "./support/fixtures";

test.describe("User API - negative tests", () => {
  test("Create a empty user", async ({ userService }) => {
    const emptyUser: UserDTORequest = {};
    let responseToJson: ErrorUserDTOResponse;
    const expectedErrorMessage = "0";
    const expectedErrorCode = 200;
    const expectedErrorType = "unknown";

    await test.step("When I try to create a empty user", async () => {
      const response = await userService.createUser(emptyUser);
      expect(response.status()).toBe(200);
      responseToJson = await response.json();
    });

    await test.step(`Then the message should hava a value of ${expectedErrorMessage}`, async () => {
      const { code, type, message } = responseToJson;
      expect(code).toBe(expectedErrorCode);
      expect(type).toBe(expectedErrorType);
      expect(message).toBe(expectedErrorMessage);
    });
  });

  test("Get a user that does not exist", async ({ userService }) => {
    const noExistingUsername = "nonExistentUser";
    const expectedErrorMessage = "User not found";
    const expectedErrorCode = 1;
    const expectedErrorType = "error";
    let responseToJson: ErrorUserDTOResponse;

    await test.step("When I try to get a user that does not exist", async () => {
      const response = await userService.getUserByUsername(noExistingUsername);
      expect(response.status()).toBe(404);
      responseToJson = await response.json();
    });

    await test.step(`Then the message should indicate "${expectedErrorMessage}"`, async () => {
      const { code, type, message } = responseToJson;
      expect(code).toBe(expectedErrorCode);
      expect(type).toBe(expectedErrorType);
      expect(message).toContain(expectedErrorMessage);
    });
  });

  test("Delete a user that does not exist", async ({ userService }) => {
    const noExistingUsername = "nonExistentUser";
    const expectedStatus = 404;

    await test.step(`When I try to delete a user that does not exist i get a ${expectedStatus}`, async () => {
      const response = await userService.deleteUserByUsername(
        noExistingUsername
      );
      expect(response.status()).toBe(expectedStatus);
    });
  });
});
