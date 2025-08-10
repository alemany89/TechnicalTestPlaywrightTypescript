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

    const expectedPetName = pet.name;
    const expectedPetStatus = pet.status;

    let petIdFromPost: number;

    await test.step("When creating a new pet", async () => {
      const postResponse = await petService.createPet(pet);
      expect(postResponse.status()).toBe(200);

      const responseFromPostToJson: PetDTOResponse = await postResponse.json();
      const { id, name, status } = responseFromPostToJson;

      expect(name).toBe(expectedPetName);
      expect(status).toBe(expectedPetStatus);

      petIdFromPost = id;
    });

    await test.step("Then the pet can be retrieved by ID", async () => {
      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      const getResponse = await pollUntilOk(getPetByIdFn);
      const petData: PetDTOResponse = await getResponse.json();
      const { id, name, status } = petData;
      expect(id).toBe(petIdFromPost);
      expect(name).toBe(expectedPetName);
      expect(status).toBe(expectedPetStatus);
    });
  });

  test(`Update status and retrieve pet by that status`, async ({
    petService,
  }) => {
    const pet = new PetBuilder()
      .withName("LuigisPet")
      .withStatus("available")
      .build();
    const expectedPetName = pet.name;
    const expectedPetStatus = pet.status;
    const expectedPetStatusAfterPUT = "sold";

    let petIdFromPost: number;

    await test.step(`Given a new pet called ${expectedPetName} with status ${expectedPetStatus}`, async () => {
      const postResponse = await petService.createPet(pet);
      expect(postResponse.status()).toBe(200);

      const responseFromPostToJson: PetDTOResponse = await postResponse.json();
      const { id, name, status } = responseFromPostToJson;
      expect(name).toBe(expectedPetName);
      expect(status).toBe(expectedPetStatus);

      petIdFromPost = id;
    });

    await test.step(`And the pet can be retrieved by ID`, async () => {
      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      const getResponse = await pollUntilOk(getPetByIdFn);
      const responseFromGetToJson: PetDTOResponse = await getResponse.json();
      const { name, status } = responseFromGetToJson;
      expect(name).toBe(expectedPetName);
      expect(status).toBe(expectedPetStatus);
    });

    await test.step(`When updating the pet status to ${expectedPetStatusAfterPUT}`, async () => {
      const updatedPet: PetDTORequest = {
        ...pet,
        status: expectedPetStatusAfterPUT,
      };
      const putResponse = await petService.updatePet(updatedPet);
      expect(putResponse.status()).toBe(200);
      const responseFromPutToJson: PetDTOResponse = await putResponse.json();
      const { name, status } = responseFromPutToJson;
      expect(name).toBe(expectedPetName);
      expect(status).toBe(expectedPetStatusAfterPUT);
    });

    await test.step(`Then the pet can be retrieved in ${expectedPetStatusAfterPUT} status`, async () => {
      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      const getResponse = await pollUntilStatus(
        getPetByIdFn,
        expectedPetStatusAfterPUT
      );
      const responseFromGetToJson: PetDTOResponse = await getResponse.json();
      const { name, status } = responseFromGetToJson;
      expect(name).toBe(expectedPetName);
      expect(status).toBe(expectedPetStatusAfterPUT);
    });
  });

  test(`Delete pet by ID`, async ({ petService }) => {
    const pet = new PetBuilder()
      .withName("LuigisPet")
      .withStatus("pending")
      .build();
    const expectedPetName = pet.name;
    const expectedPetStatus = pet.status;

    let petIdFromPost = 0;

    await test.step(`Given a new pet called ${expectedPetName}`, async () => {
      const postResponse = await petService.createPet(pet);
      expect(postResponse.status()).toBe(200);

      const responseFromPostToJson: PetDTOResponse = await postResponse.json();
      const { id, name, status } = responseFromPostToJson;
      expect(name).toBe(expectedPetName);
      expect(status).toBe(expectedPetStatus);

      petIdFromPost = id;
    });

    await test.step(`And the pet can be retrieved by ID ${petIdFromPost}`, async () => {
      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      const getResponse = await pollUntilOk(getPetByIdFn);
      const getResponseFromJson: PetDTOResponse = await getResponse.json();

      expect(getResponseFromJson.name).toBe(expectedPetName);
      expect(getResponseFromJson.status).toBe(expectedPetStatus);
    });

    await test.step(`When deleting the pet trough id ${petIdFromPost}`, async () => {
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

    await test.step(`Then the pet with id ${petIdFromPost} is not found after 5 tries`, async () => {
      const numberOfRetries = 5;

      const getPetByIdFn = () => petService.getPetById(petIdFromPost);
      await expect(pollUntilOk(getPetByIdFn, numberOfRetries)).rejects.toThrow(
        `Failed after ${numberOfRetries} retries.`
      );
    });
  });
});
