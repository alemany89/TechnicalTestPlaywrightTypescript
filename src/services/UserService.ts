import { APIRequestContext } from "playwright/test";
import { User } from "../models/User";

export class UserService {
  private baseURL: string;

  constructor(private request: APIRequestContext, private log: boolean = true) {
    this.baseURL = "https://petstore.swagger.io/v2";
  }
  async createUser(user: User) {
    this.log && console.log(`➡️ [POST] /user\n`, JSON.stringify(user, null, 2));

    const response = await this.request.post(`${this.baseURL}/user`, {
      data: user,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (this.log) {
      console.log(`⬅️ [${response.status()}] POST /user`);
      const responseBody = await response.json();
      console.log("Response JSON:", JSON.stringify(responseBody, null, 2));
    }

	return response;
  }

  async getUserByUsername(username: string) {
    this.log && console.log(`➡️ [GET] ${this.baseURL}/user/${username}`);

    const response = await this.request.get(`${this.baseURL}/user/${username}`);

    if (this.log) {
      console.log(`⬅️ [${response.status()}] GET /user/${username}`);
      const responseBody = await response.json();
      console.log("Response JSON:", JSON.stringify(responseBody, null, 2));
    }

    return response;
  }

  async deleteUserByUsername(username: string) {
	this.log && console.log(`➡️ [DELETE] ${this.baseURL}/user/${username}`);

	const response = await this.request.delete(`${this.baseURL}/user/${username}`);

	if (this.log) {
	  console.log(`⬅️ [${response.status()}] DELETE /user/${username}`);
	  const responseBody = await response.json();
	  console.log("Response JSON:", JSON.stringify(responseBody, null, 2));
	}

	return response;

  }
}
