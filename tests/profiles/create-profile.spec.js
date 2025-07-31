const { describe, test } = require("@playwright/test");
const { LoginPage } = require('../../pages/login-page');
const { MainPage } = require('../../pages/main-page');
const { ProfilePage } = require('../../pages/profiles-page');

describe("[Functional Test] Create profile", () => {
  //Variable declaration
  let loginPage = null;
  let mainPage = null;
  let profilePage = null;

  // 1. Describe configuration
  test.describe.configure({ mode: "serial" });

  // 2. Open main window
  test.beforeEach(async ({ page }) => {
    await page.goto('');
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    profilePage = new ProfilePage(page);
  });

  // 3. Test implementation
  test.describe("When we create a new profile", () => {
    test("Should see the profile we created in the list", async () => {
      await loginPage.login('managerqa', 'managerqa');

      await mainPage.verifyMainPageIsLoaded();
      await mainPage.navigateToProfileList();
      await mainPage.verifyUserList();

      await profilePage.createProfile();
      await profilePage.searchProfile('QATest');
      await profilePage.deleteProfile();
      await profilePage.verifyProfileIsDeleted();
    });
  });

//   test.describe("When we enter invalid project data", () => {
//     test("Should see the errors", async () => {
//       await loginPage.login('managerqa', 'managerqa');

//       await mainPage.verifyMainPageIsLoaded();
//       await mainPage.navigateToUserList();
//       await mainPage.verifyUserList();

//       await userPage.verifyNewUserErrors();
//     });
//   });
});
