const { expect } = require('playwright/test');

class MainPage {
  constructor(page) {
    this.page = page;
    this.initializeLocators();
  }

  initializeLocators() {
    this.dashboard = this.page.locator('.ant-card-bordered').first();
    this.settingsButton = this.page.locator('.dropdownSettings');
    this.dropodownUserButton = this.page.locator('.ant-dropdown-menu-item').first();
    this.dropodownProfileButton = this.page.locator('.anticon-money-collect');
    this.dropdownProjectButton = this.page.locator('.anticon-project');
    this.userRow = this.page.locator('.ant-table-row-level-0');
  }

  async verifyMainPageIsLoaded() {
    await expect(this.dashboard).toBeVisible();
  }

  async navigateToUserList() {
    await this.page.waitForTimeout(2000);
    await this.settingsButton.click();
    await this.dropodownUserButton.click();
  }

  async navigateToProfileList() {
    await this.page.waitForTimeout(2000);
    await this.settingsButton.click();
    await this.dropodownProfileButton.click();
  }

  async navigateToProjectList() {
    await this.page.waitForTimeout(2000);
    await this.settingsButton.click();
    await this.dropdownProjectButton.click();
  }

  async verifyUserList() {
    await this.page.waitForTimeout(5000);
    const rowCount = await this.userRow.count();
    expect(rowCount).toBeGreaterThan(1);
  }
}

module.exports = { MainPage };
