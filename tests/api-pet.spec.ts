import { PetBuilder } from "../src/builders/PetBuilder";
import { pollUntilOk } from "../src/utils/polling";
import { expect, test } from "./support/fixtures";

test.describe("Pet API - CRUD tests", () => {
  test("Create and retrieve pet by ID", async ({ petService }) => {
    const pet = new PetBuilder()
      .withId(Date.now())
      .withName("LuigisPet")
      .withStatus("owned")
      .build();

    let petIdFromPost: number;

    await test.step("Create a new pet", async () => {
      const postResponse = await petService.createPet(pet);
      expect(postResponse.status()).toBe(200);

      const responseFromPostToJson = await postResponse.json();
      expect(responseFromPostToJson.name).toBe("LuigisPet");
      expect(responseFromPostToJson.status).toBe("owned");

      petIdFromPost = responseFromPostToJson.id;
    });

    await test.step("Get pet until pet is available by ID", async () => {
      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      const getResponse = await pollUntilOk(getPetByIdFn);
      const petData = await getResponse.json();

      expect(petData.name).toBe("LuigisPet");
      expect(petData.status).toBe("owned");
    });
  });
});
