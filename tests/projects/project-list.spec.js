const { describe, test } = require("@playwright/test");
const { LoginPage } = require('../../pages/login-page');
const { MainPage } = require('../../pages/main-page');

describe("[Functional Test] Project list", () => {
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
  test.describe("When we navigate to project list", () => {
    test("Should see the project list", async () => {
      await loginPage.login('managerqa', 'managerqa');

      await mainPage.verifyMainPageIsLoaded();
      await mainPage.navigateToProjectList();
      await mainPage.verifyUserList();
    });
  });
});
