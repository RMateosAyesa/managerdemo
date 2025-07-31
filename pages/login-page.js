const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.initializeLocators();
  }

  initializeLocators() {
    this.emailInput = this.page.locator('#username');
    this.passwordInput = this.page.locator('#password');
    this.submitButton = this.page.locator('#kc-login');
    this.inputError = this.page.locator('#input-error');
  }

    async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async verifyLoginFailure() {
    await expect(this.inputError).toBeVisible();
  }
}

module.exports = { LoginPage };
