import { expect, test } from "./support/fixtures";

test.describe("User API - negative tests", () => {
  test("Create a empty user", async ({ userService }) => {
    const emptyUser = {};
    let responseToJson: any;

    await test.step("When I try to create a empty user", async () => {
      const response = await userService.createUser(emptyUser);
      expect(response.status()).toBe(200);
      responseToJson = await response.json();
    });

    await test.step("Then the message should hava a value of 0", async () => {
      const expectedResponseFromEmptyUser = {
        code: 200,
        type: "unknown",
        message: "0",
      };
      expect(responseToJson).toEqual(expectedResponseFromEmptyUser);
    });
  });
});
