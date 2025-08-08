import { PetBuilder } from "../src/builders/PetBuilder";
import { PetDeleteDTOResponse } from "../src/dto/pet/PetDeleteDTOResponse";
import { PetDTORequest } from "../src/dto/pet/PetDTORequest";
import { PetDTOResponse } from "../src/dto/pet/PetDTOResponse";
import { pollUntilOk, pollUntilStatus } from "../src/utils/polling";
import { expect, test } from "./support/fixtures";

test.describe("Pet API - CRUD tests", () => {
  test("Create and retrieve pet by ID", async ({ petService }) => {
    const pet = new PetBuilder()
      .withName("LuigisPet")
      .withStatus("sold")
      .build();

    let petIdFromPost: number;

    await test.step("When creating a new pet", async () => {
      const postResponse = await petService.createPet(pet);
      expect(postResponse.status()).toBe(200);

      const responseFromPostToJson: PetDTOResponse = await postResponse.json();
      const { id, name, status } = responseFromPostToJson;

      expect(name).toBe("LuigisPet");
      expect(status).toBe("sold");

      petIdFromPost = id;
    });

    await test.step("Then the pet can be retrieved by ID", async () => {
      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      const getResponse = await pollUntilOk(getPetByIdFn);
      const petData: PetDTOResponse = await getResponse.json();
      const { id, name, status } = petData;
      expect(id).toBe(petIdFromPost);
      expect(name).toBe("LuigisPet");
      expect(status).toBe("sold");
    });
  });

  test("Update status and retrieve pet by that status", async ({
    petService,
  }) => {
    const pet = new PetBuilder()
      .withName("LuigisPet")
      .withStatus("available")
      .build();

    let petIdFromPost: number;

    await test.step("Given a new pet", async () => {
      const postResponse = await petService.createPet(pet);
      expect(postResponse.status()).toBe(200);

      const responseFromPostToJson: PetDTOResponse = await postResponse.json();
      const { id, name, status } = responseFromPostToJson;
      expect(name).toBe("LuigisPet");
      expect(status).toBe("available");

      petIdFromPost = id;
    });

    await test.step("And the pet can be retrieved by ID", async () => {
      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      const getResponse = await pollUntilOk(getPetByIdFn);
      const responseFromGetToJson: PetDTOResponse = await getResponse.json();
      const { name, status } = responseFromGetToJson;
      expect(name).toBe("LuigisPet");
      expect(status).toBe("available");
    });

    await test.step("When updating the pet status to sold", async () => {
      const updatedPet: PetDTORequest = { ...pet, status: "sold" };
      const putResponse = await petService.updatePet(updatedPet);
      expect(putResponse.status()).toBe(200);
      const responseFromPutToJson: PetDTOResponse = await putResponse.json();
      const { name, status } = responseFromPutToJson;
      expect(name).toBe("LuigisPet");
      expect(status).toBe("sold");
    });

    await test.step("Then the pet can be retrieved in sold status", async () => {
      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      const getResponse = await pollUntilStatus(getPetByIdFn, "sold");
      const responseFromGetToJson: PetDTOResponse = await getResponse.json();
      const { name, status } = responseFromGetToJson;
      expect(name).toBe("LuigisPet");
      expect(status).toBe("sold");
    });
  });

  test("Delete pet by ID", async ({ petService }) => {
    const pet = new PetBuilder()
      .withName("LuigisPet")
      .withStatus("pending")
      .build();

    let petIdFromPost: number;

    await test.step("Given a new pet", async () => {
      const postResponse = await petService.createPet(pet);
      expect(postResponse.status()).toBe(200);

      const responseFromPostToJson: PetDTOResponse = await postResponse.json();
      const { id, name, status } = responseFromPostToJson;
      expect(name).toBe("LuigisPet");
      expect(status).toBe("pending");

      petIdFromPost = id;
    });

    await test.step("And the pet can be retrieved by ID", async () => {
      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      const getResponse = await pollUntilOk(getPetByIdFn);
      const getResponseFromJson: PetDTOResponse = await getResponse.json();

      expect(getResponseFromJson.name).toBe("LuigisPet");
      expect(getResponseFromJson.status).toBe("pending");
    });

    await test.step("When deleting the pet", async () => {
      const deletePetByIdFn = () => petService.deletePetById(petIdFromPost);
      const deleteResponse = await pollUntilOk(deletePetByIdFn);

      expect(deleteResponse.status()).toBe(200);
      const deleteResponseFromJson: PetDeleteDTOResponse =
        await deleteResponse.json();

      const expectedJsonResponse = {
        code: 200,
        type: "unknown",
        message: `${petIdFromPost}`,
      } satisfies PetDeleteDTOResponse;
      
      expect(deleteResponseFromJson).toEqual(expectedJsonResponse);
    });

    await test.step("Then the pet is not found after 5 tries ", async () => {
      const numberOfRetries = 5;

      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      await expect(pollUntilOk(getPetByIdFn, numberOfRetries)).rejects.toThrow(
        `Failed after ${numberOfRetries} retries.`
      );
    });
  });
});
