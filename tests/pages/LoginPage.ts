import { expect, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage.js";



export class LoginPage extends CommonPage {


  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    const usernameInput = this.page.locator("#user-name");
    const passwordInput = this.page.locator("#password");
    const loginButton = this.page.locator('#login-button');

    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();
  }

  async navigate() {
    await this.page.goto("https://www.saucedemo.com/");
  }

}
