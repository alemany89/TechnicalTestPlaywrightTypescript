import { expect, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage.js";

export class LoginPage extends CommonPage {
  private static readonly USERNAME_INPUT_SELECTOR = "#user-name";
  private static readonly PASSWORD_INPUT_SELECTOR = "#password";
  private static readonly LOGIN_BUTTON_SELECTOR = "#login-button";
  private static readonly ERROR_MESSAGE_SELECTOR = "[data-test='error']";

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.page.locator(LoginPage.USERNAME_INPUT_SELECTOR).fill(username);
    await this.page.locator(LoginPage.PASSWORD_INPUT_SELECTOR).fill(password);
    await this.page.locator(LoginPage.LOGIN_BUTTON_SELECTOR).click();
  }

  async navigate() {
    await this.page.goto("https://www.saucedemo.com/", {
      waitUntil: "networkidle",
    });
  }

  async getErrorMessage() {
    return await this.getText(
      this.page.locator(LoginPage.ERROR_MESSAGE_SELECTOR)
    );
  }

  async isLoaded() {
    expect(
      await this.page.locator(LoginPage.LOGIN_BUTTON_SELECTOR).isVisible()
    ).toBeTruthy();
  }
}
