const { describe, test } = require("@playwright/test");
const { LoginPage } = require('../../pages/login-page');
const { MainPage } = require('../../pages/main-page');
const { ProjectPage } = require('../../pages/project-page');

describe("[Functional Test] Create project", () => {
  //Variable declaration
  let loginPage = null;
  let mainPage = null;
  let projectPage = null;

  // 1. Describe configuration
  test.describe.configure({ mode: "serial" });

  // 2. Open main window
  test.beforeEach(async ({ page }) => {
    await page.goto('');
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    projectPage = new ProjectPage(page);
  });

  // 3. Test implementation
  test.describe("When we create a new project", () => {
    test("Should see the profile we created in the list", async () => {
      await loginPage.login('managerqa', 'managerqa');

      await mainPage.verifyMainPageIsLoaded();
      await mainPage.navigateToProjectList();
      await mainPage.verifyUserList();

      await projectPage.createNewProject();
      await projectPage.searchProject('QATest');
      await projectPage.deleteProject();
    });
  });

   test.describe("When we enter invalid project data", () => {
     test("Should see the errors", async () => {
        await loginPage.login('managerqa', 'managerqa');

        await mainPage.verifyMainPageIsLoaded();
        await mainPage.navigateToProjectList();
        await mainPage.verifyUserList();

        await projectPage.createEmptyProject();
        await projectPage.verifyProjectError();
     });
   });
});
