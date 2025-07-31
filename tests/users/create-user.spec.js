const { describe, test } = require("@playwright/test");
const { LoginPage } = require('../../pages/login-page');
const { MainPage } = require('../../pages/main-page');
const { UserPage } = require('../../pages/users-page');

describe("[Functional Test] Create user", () => {
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
  test.describe("When we create a new user", () => {
    test("Should see the user we created in the list", async () => {
      await loginPage.login('managerqa', 'managerqa');

      await mainPage.verifyMainPageIsLoaded();
      await mainPage.navigateToUserList();
      await mainPage.verifyUserList();

      await userPage.createUser();
      await userPage.searchUser('QATester');
      await userPage.deleteUser();
    });
  });

  test.describe("When we enter invalid new user data", () => {
    test("Should see the errors", async () => {
      await loginPage.login('managerqa', 'managerqa');

      await mainPage.verifyMainPageIsLoaded();
      await mainPage.navigateToUserList();
      await mainPage.verifyUserList();

      await userPage.verifyNewUserErrors();
    });
  });
});
