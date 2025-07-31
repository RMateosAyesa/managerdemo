const { describe, test } = require("@playwright/test");
const { LoginPage } = require('../../pages/login-page');
const { MainPage } = require('../../pages/main-page');

describe("[Functional Test] User list", () => {
  //Variable declaration
  let loginPage = null;
  let mainPage = null;

  // 1. Describe configuration
  test.describe.configure({ mode: "serial" });

  // 2. Open main window
  test.beforeEach(async ({ page }) => {
    await page.goto('');
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
  });

  // 3. Test implementation
  test.describe("When we navigate to user list", () => {
    test("Should see the user list", async () => {
      await loginPage.login('managerqa', 'managerqa');

      await mainPage.verifyMainPageIsLoaded();
      await mainPage.navigateToUserList();
      await mainPage.verifyUserList();
    });
  });
});
