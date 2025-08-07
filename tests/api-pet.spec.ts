import { PetBuilder } from "../src/builders/PetBuilder";
import { Pet } from "../src/models/Pet";
import { pollUntilOk, pollUntilStatus } from "../src/utils/polling";
import { expect, test } from "./support/fixtures";

test.describe("Pet API - CRUD tests", () => {
  test("Create and retrieve pet by ID", async ({ petService }) => {
    const pet = new PetBuilder()
      .withId(Date.now())
      .withName("LuigisPet")
      .withStatus("sold")
      .build();

    let petIdFromPost: number;

    await test.step("Create a new pet", async () => {
      const postResponse = await petService.createPet(pet);
      expect(postResponse.status()).toBe(200);

      const responseFromPostToJson = await postResponse.json();
      expect(responseFromPostToJson.name).toBe("LuigisPet");
      expect(responseFromPostToJson.status).toBe("sold");

      petIdFromPost = responseFromPostToJson.id;
    });

    await test.step("Get pet until pet is available by ID", async () => {
      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      const getResponse = await pollUntilOk(getPetByIdFn);
      const petData = await getResponse.json();

      expect(petData.name).toBe("LuigisPet");
      expect(petData.status).toBe("sold");
    });
  });

  test("Update status and retrieve pet by that status", async ({ petService }) => {
    const pet = new PetBuilder()
      .withId(Date.now())
      .withName("LuigisPet")
      .withStatus("available")
      .build();

    let petIdFromPost: number;

    await test.step("Create a new pet", async () => {
      const postResponse = await petService.createPet(pet);
      expect(postResponse.status()).toBe(200);

      const responseFromPostToJson = await postResponse.json();
      expect(responseFromPostToJson.name).toBe("LuigisPet");
      expect(responseFromPostToJson.status).toBe("available");

      petIdFromPost = responseFromPostToJson.id;
    });

    await test.step("Get pet until pet is returned", async () => {
      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      const getResponse = await pollUntilOk(getPetByIdFn);
      const responseFromGetToJson = await getResponse.json();

      expect(responseFromGetToJson.name).toBe("LuigisPet");
      expect(responseFromGetToJson.status).toBe("available");
    });

    await test.step("Update pet status to sold", async () => {
      const updatedPet: Pet = { ...pet, status: "sold" };
      const putResponse = await petService.updatePet(updatedPet);
      expect(putResponse.status()).toBe(200);
      const responseFromPutToJson = await putResponse.json();
      expect(responseFromPutToJson.status).toBe("sold");
    });

    await test.step("Get pet until pet is in sold status", async () => {
      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      const getResponse = await pollUntilStatus(getPetByIdFn, "sold");
      const responseFromGetToJson = await getResponse.json();

      expect(responseFromGetToJson.name).toBe("LuigisPet");
      expect(responseFromGetToJson.status).toBe("sold");
    });
  });

  test("Delete pet by ID", async ({ petService }) => {
    const pet = new PetBuilder()
      .withId(Date.now())
      .withName("LuigisPet")
      .withStatus("pending")
      .build();

    let petIdFromPost: number;

    await test.step("Create a new pet", async () => {
      const postResponse = await petService.createPet(pet);
      expect(postResponse.status()).toBe(200);

      const responseFromPostToJson = await postResponse.json();
      expect(responseFromPostToJson.name).toBe("LuigisPet");
      expect(responseFromPostToJson.status).toBe("pending");

      petIdFromPost = responseFromPostToJson.id;
    });

    await test.step("Get pet until pet is available by ID", async () => {
      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      const getResponse = await pollUntilOk(getPetByIdFn);
      const getResponseFromJson = await getResponse.json();

      expect(getResponseFromJson.name).toBe("LuigisPet");
      expect(getResponseFromJson.status).toBe("pending");
    });

    await test.step("Delete pet by ID", async () => {
      const deletePetByIdFn = () => petService.deletePetById(petIdFromPost);
      const deleteResponse = await pollUntilOk(deletePetByIdFn);
      const expectedJsonResponse = {
        code: 200,
        type: "unknown",
        message: `${petIdFromPost}`,
      };

      expect(deleteResponse.status()).toBe(200);
      const deleteResponseFromJson = await deleteResponse.json();
      expect(deleteResponseFromJson).toEqual(expectedJsonResponse);
    });

    await test.step("Check Get pet  is not found after 5 tries", async () => {
      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      await expect(pollUntilOk(getPetByIdFn)).rejects.toThrow(
        "Failed after 5 retries."
      );
    });
  });
});
