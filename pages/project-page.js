const { expect } = require("@playwright/test");

class ProjectPage {
  constructor(page) {
    this.page = page;
    this.initializeLocators();
  }

  initializeLocators() {
    this.newProjectBtn = this.page.locator('.projectButtons > button');
    this.projectName = this.page.locator('#name');
    this.projectTag = this.page.locator('#tag');
    this.projectAppCheckbox = this.page.locator('.ant-checkbox-group-item').first();
    this.projectSaveBtn = this.page.locator('[form="PROJECT_FORM_ID"]');
    this.projectSearchbox = this.page.locator('.ant-input').first();
    this.deleteProjectTextBtn = this.page.locator('.ant-typography-link');
    this.confirmDeleteBtn = this.page.locator('.ant-popover-buttons > button').last();
    this.projectListEmpty = this.page.locator('.ant-table-placeholder');
    this.projectNameError = this.page.locator('#name_help');
    this.addUserBtn = this.page.locator('.ant-btn-primary').first();
    this.userAsignationDropdown = this.page.locator('#uuid');
    this.userDropdownOption = this.page.locator('[title="managerqa@devaid.eu"]');
    this.projectNameLink = this.page.locator('.ant-table-cell > a');
    this.saveUserToProject = this.page.locator('[form="ADD_USER_TO_PROJECT_ID"]');
    this.deleteUserBtn = this.page.locator('.ant-btn-icon-only');
    this.projectEmptyUser = this.page.locator('.ant-empty-image');
  }

  async verifyUsersAtProjectIsEmpty() {
    await this.page.waitForTimeout(2000);
    await expect(this.projectEmptyUser).toBeVisible();
  }

  async deleteUserFromProject() {
    await this.page.waitForTimeout(2000);
    await this.deleteUserBtn.click();
    await this.page.waitForTimeout(2000);
    await this.projectSaveBtn.click();
  }

  async navigateToProject(projectName) {
    await this.searchProject(projectName);
    await this.projectNameLink.click();
  }

  async addUserToProject(userName) {
    await this.addUserBtn.click();
    await this.userAsignationDropdown.fill(userName);
    await this.userDropdownOption.click();
    await this.saveUserToProject.click();
    await this.page.waitForTimeout(2000);
    await this.projectSaveBtn.click();
  }

  async createNewProject() {
    await this.newProjectBtn.click();
    await this.projectName.fill('QATest');
    await this.projectTag.fill('Testing');
    await this.projectAppCheckbox.click();
    await this.page.waitForTimeout(2000);
    await this.projectSaveBtn.click();
  }

  async searchProject(projectName) {
    await this.page.waitForTimeout(2000);
    await this.projectSearchbox.fill(projectName);
    await this.page.waitForTimeout(2000);
  }

  //Usar con el searchProject delante
  async deleteProject() {
    await this.deleteProjectTextBtn.click();
    await this.confirmDeleteBtn.click();
    await expect(this.projectListEmpty).toBeVisible();
  }

  async createEmptyProject() {
    await this.newProjectBtn.click();
    await this.projectSaveBtn.click();
  }

  async verifyProjectError() {
    await expect(this.projectNameError).toBeVisible();
  }
}

module.exports = { ProjectPage };
