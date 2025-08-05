const { expect } = require('playwright/test');

class UserPage {
  constructor(page) {
    this.page = page;
    this.initializeLocators();
  }

  initializeLocators() {
    this.dashboard = this.page.locator('.ant-card-bordered').first();
    this.newUserBtn = this.page.locator('.userButtons > button').last();
    this.newUserFirstName = this.page.locator('#firstName');
    this.newUserLastName = this.page.locator('#lastName');
    this.newUserName = this.page.locator('#username'); 
    this.newUserRoleDropdown = this.page.locator('.ant-select-selector').first();
    this.developerOption = this.page.locator('[title="Desarrollador"]');
    this.newUserEmail = this.page.locator('#email');
    this.newUserPassword = this.page.locator('#password');
    this.newUserCompany = this.page.locator('#company');
    this.newUserCostProfileDropdown = this.page.locator('.ant-select-selector').last();
    this.a30ProfileOption = this.page.locator('[title="A-30"]');
    this.userSearchbox = this.page.locator('.ant-input');
    this.saveNewUserBtn = this.page.locator('[form="my-profile-form"]');
    this.deleteUserButton = this.page.locator('.actionText').first();
    this.confirmDeleteButton = this.page.locator('.ant-btn-sm').last();
    this.emptyTable = this.page.locator('.ant-empty-normal');
    this.userTextButton = this.page.locator('.clickableText').first();
    this.changeRoleTextButton = this.page.locator('.actionText').last();
    this.roleChangeDropdown = this.page.locator('.ant-select-multiple');
    this.adminOption = this.page.locator('[title="Administrador"]');
    this.saveNewRole = this.page.locator('.ant-btn-primary').last();
    this.adminRole = this.page.locator('.ant-tag-has-color', { hasText: "Administrador" });
    this.removeRoleButton = this.page.locator('.ant-select-selection-item-remove');
    this.nameError = this.page.locator('#firstName_help');
    this.lastNameError = this.page.locator('#lastName_help');
    this.usernameError = this.page.locator('#username_help');
    this.roleError = this.page.locator('#rol_help');
    this.emailError = this.page.locator('#email_help');
    this.passwordError = this.page.locator('#password_help');
    this.companyError = this.page.locator('#company_help');
    this.profileCostError = this.page.locator('#profileCost_help');
  }

  async verifyNewUserErrors() {
    await this.newUserBtn.click();
    await this.saveNewUserBtn.click();
    await this.page.waitForTimeout(2000);
    await expect(this.nameError).toBeVisible();
    await expect(this.lastNameError).toBeVisible();
    await expect(this.usernameError).toBeVisible();
    await expect(this.roleError).toBeVisible();
    await expect(this.emailError).toBeVisible();
    await expect(this.passwordError).toBeVisible();
    await expect(this.companyError).toBeVisible();
    await expect(this.profileCostError).toBeVisible();
  }

  async verifyNewRole() {
    await expect(this.adminRole).toBeVisible();
  }

  async editRole() {
    await this.changeRoleTextButton.click();
    await this.removeRoleButton.click();
    await this.roleChangeDropdown.click();
    await this.adminOption.click();
    await this.saveNewRole.click();
  }

  async editUser() {
    await this.userTextButton.click();
    await this.newUserFirstName.fill('EditedUser');
    await this.newUserPassword.fill('QAPass');
    await this.saveNewUserBtn.click();
  }

  async deleteUser() {
    await this.deleteUserButton.click();
    await this.confirmDeleteButton.click();
    await this.page.waitForTimeout(3000);
    await expect(this.emptyTable).toBeVisible();
  }

  async searchUser(username) {
    await this.userSearchbox.fill(username);
    await this.page.waitForTimeout(2000);
  }

  async createUser() {
    await this.newUserBtn.click();
    await this.newUserFirstName.fill('QATester');
    await this.newUserLastName.fill('Tester');
    await this.newUserName.fill('QAUser');
    await this.newUserRoleDropdown.click();
    await this.developerOption.click();
    await this.newUserEmail.fill('QAMail@test.com');
    await this.newUserPassword.fill('QAPass');
    await this.newUserCompany.fill('AyesaQA');
    await this.newUserCostProfileDropdown.click();
    await this.a30ProfileOption.click();
    await this.saveNewUserBtn.click();
    await this.page.waitForTimeout(3000);
  }

  async verifyUserList() {
    await this.page.waitForTimeout(2000);
    const rowCount = await this.userRow.count();
    expect(rowCount).toBeGreaterThan(1);
  }
}

module.exports = { UserPage };
