import { ErrorUserDTOResponse } from "../src/dto/user/ErrorUserDTOResponse";
import { UserDTORequest } from "../src/dto/user/UserDTORequest";
import { expect, test } from "./support/fixtures";

test.describe("User API - negative tests", () => {
  test("Create a empty user", async ({ userService }) => {
    const emptyUser: UserDTORequest = {};
    let responseToJson: ErrorUserDTOResponse;

    await test.step("When I try to create a empty user", async () => {
      const response = await userService.createUser(emptyUser);
      expect(response.status()).toBe(200);
      responseToJson = await response.json();
    });

    await test.step("Then the message should hava a value of 0", async () => {
      const { code, type, message } = responseToJson;
      expect(code).toBe(200);
      expect(type).toBe("unknown");
      expect(message).toBe("0");
    });
  });

  test("Get a user that does not exist", async ({ userService }) => {
    const noExistingUsername = "nonExistentUser";
    let responseToJson: ErrorUserDTOResponse;

    await test.step("When I try to get a user that does not exist", async () => {
      const response = await userService.getUserByUsername(noExistingUsername);
      expect(response.status()).toBe(404);
      responseToJson = await response.json();
    });

    await test.step("Then the message should indicate the user was not found", async () => {
      const { code, type, message } = responseToJson;
      expect(code).toBe(1);
      expect(type).toBe("error");
      expect(message).toContain(`User not found`);
    });
  });

  test("Delete a user that does not exist", async ({ userService }) => {
    const noExistingUsername = "nonExistentUser";

    await test.step("When I try to delete a user that does not exist i get a 404", async () => {
      const response = await userService.deleteUserByUsername(
        noExistingUsername
      );
      expect(response.status()).toBe(404);
    });
  });
});
