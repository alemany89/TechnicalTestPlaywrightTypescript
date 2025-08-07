import { APIRequestContext } from "@playwright/test";
import { Pet } from "../models/Pet";

export class PetService {
  private baseURL: string;

  constructor(private request: APIRequestContext, private log: boolean = true) {
    this.baseURL = "https://petstore.swagger.io/v2";
  }

  async createPet(pet: Pet) {
    this.log &&
      console.log(
        `➡️ [POST] ${this.baseURL}/pet\n`,
        JSON.stringify(pet, null, 2)
      );

    const response = await this.request.post(`${this.baseURL}/pet`, {
      data: pet,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (this.log) {
      console.log(`⬅️ [${response.status()}] POST /pet`);
      const responseBody = await response.json();
      console.log("Response JSON:", JSON.stringify(responseBody, null, 2));
    }

    return response;
  }

  async getPetById(id: number) {
    this.log && console.log(`➡️ [GET] ${this.baseURL}/pet/${id}`);

    const response = await this.request.get(`${this.baseURL}/pet/${id}`);

    if (this.log) {
      console.log(`⬅️ [${response.status()}] GET /pet/${id}`);
      const responseBody = await response.json();
      console.log("Response JSON:", JSON.stringify(responseBody, null, 2));
    }

    return response;
  }

  async updatePet(updatedPet: Pet) {
    this.log &&
      console.log(
        `➡️ [PUT] ${this.baseURL}/pet\n`,
        JSON.stringify(updatedPet, null, 2)
      );

    const response = await this.request.put(`${this.baseURL}/pet`, {
      data: updatedPet,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (this.log) {
      console.log(`⬅️ [${response.status()}] PUT /pet`);
      const responseBody = await response.json();
      console.log("Response JSON:", JSON.stringify(responseBody, null, 2));
    }

    return response;
  }

  async deletePetById(petIdFromPost: number) {
    this.log && console.log(`➡️ [DELETE] ${this.baseURL}/pet/${petIdFromPost}`);

    const response = await this.request.delete(
      `${this.baseURL}/pet/${petIdFromPost}`,
      {
        headers: {
          accept: "application/json",
          api_key: "special-key",
        },
      }
    );

    if (this.log) {
      console.log(`⬅️ [${response.status()}] DELETE /pet/${petIdFromPost}`);
      const responseBody = await response.json();
      console.log("Response JSON:", JSON.stringify(responseBody, null, 2));
    }

    return response;
  }
}
