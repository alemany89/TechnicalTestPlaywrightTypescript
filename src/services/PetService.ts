import { APIRequestContext } from "@playwright/test";

export class PetService {
  private baseURL: string;

  constructor(private request: APIRequestContext, private log: boolean = true) {
    this.baseURL = "https://petstore.swagger.io/v2";
  }

  async createPet(pet: any) {
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
}
