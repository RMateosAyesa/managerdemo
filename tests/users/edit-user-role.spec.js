const { describe, test } = require("@playwright/test");
const { LoginPage } = require('../../pages/login-page');
const { MainPage } = require('../../pages/main-page');
const { UserPage } = require('../../pages/users-page');

describe("[Functional Test] Edit user role", () => {
  //Variable declaration
  let loginPage = null;
  let mainPage = null;
  let userPage = null;

  // 1. Describe configuration
  test.describe.configure({ mode: "serial" });

  // 2. Open main window
  test.beforeEach(async ({ page }) => {
    await page.goto('');
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    userPage = new UserPage(page);
  });

  // 3. Test implementation
  test.describe("When we edit a user role", () => {
    test("Should see the new role we gave to the user", async () => {
      await loginPage.login('managerqa', 'managerqa');

      await mainPage.verifyMainPageIsLoaded();
      await mainPage.navigateToUserList();
      await mainPage.verifyUserList();

      await userPage.createUser();
      await userPage.searchUser('QATester');
      await userPage.editRole();
      await userPage.verifyNewRole();
      await userPage.deleteUser();
    });
  });
});
