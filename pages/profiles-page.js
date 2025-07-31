const { expect } = require('playwright/test');

class ProfilePage {
  constructor(page) {
    this.page = page;
    this.initializeLocators();
  }

  initializeLocators() {
    this.newProfileBtn = this.page.locator('.profile-cost-buttons > button');
    this.profileName = this.page.locator('#profile');
    this.merchantProfileDropdown = this.page.locator('#mercantileProfile');
    this.merchantProfileOption = this.page.locator('[title="Asda"]');
    this.profileCost = this.page.locator('#cost').first();
    this.addProfileBtn = this.page.locator('.ant-btn-primary').last();
    this.profileSearchbox = this.page.locator('[type="search"]').first();
    this.deleteProfileBtn = this.page.locator('.clickableText');
    this.confirmDeleteBtn = this.page.locator('.ant-btn-sm').last();
    this.newProfileSelection = this.page.locator('#newProfileCost');
    this.newProfileOption = this.page.locator('[title="A-30"]');
    this.newProfileSaveBtn = this.page.locator('.ant-btn-primary').last();
    this.emptyProfileTable = this.page.locator('.ant-table-placeholder');
    this.confirmDeleteMsg = this.page.locator('.ant-notification-notice-message');
    this.editTestBtn = this.page.locator('.ant-space-item').last();
    this.costTableCell = this.page.locator('.ant-table-tbody > tr > td' , { hasText:'998' });
  }

  async verifyProfileIsEdited() {
    await this.page.reload({ waitUntil: 'networkidle' });
    await this.searchProfile('QATest');
    await expect(this.costTableCell).toBeVisible();
  }

  async editProfile() {
    await this.editTestBtn.click();
    await this.page.waitForTimeout(2000);
    await this.profileCost.fill('998'); //A partir de 999 mete decimales por algún bug
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);
  }

  async createProfile() {
    await this.newProfileBtn.click();
    await this.profileName.fill('QATest');
    await this.merchantProfileDropdown.click();
    await this.merchantProfileOption.click();
    await this.profileCost.fill('1337');
    await this.addProfileBtn.click();
  }

  async searchProfile(profileName) {
    await this.profileSearchbox.fill(profileName);
    await this.page.waitForTimeout(2000);
  }

  async deleteProfile() {
    await this.deleteProfileBtn.click();
    await this.confirmDeleteBtn.click();
    await this.newProfileSelection.click();
    await this.newProfileOption.click();
    await this.newProfileSaveBtn.click();
    await this.page.waitForTimeout(3000);
  }

  async verifyProfileIsDeleted() {
    await this.page.reload({ waitUntil: 'networkidle' });
    await this.searchProfile('QATest');
    await expect(this.emptyProfileTable).toBeVisible();
  }
}

module.exports = { ProfilePage };
