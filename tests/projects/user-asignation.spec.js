const { describe, test } = require("@playwright/test");
const { LoginPage } = require('../../pages/login-page');
const { MainPage } = require('../../pages/main-page');
const { ProjectPage } = require('../../pages/project-page');

describe("[Functional Test] Add user to project", () => {
  test.setTimeout(60000);
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
  test.describe("When we add an user to a project", () => {
    test("Should see the user at the project", async () => {
      await loginPage.login('managerqa', 'managerqa');

      await mainPage.verifyMainPageIsLoaded();
      await mainPage.navigateToProjectList();
      await mainPage.verifyUserList();

      await projectPage.createNewProject();
      await projectPage.navigateToProject('QATest');
      await projectPage.addUserToProject('managerqa');
      await projectPage.navigateToProject('QATest');
      await projectPage.deleteUserFromProject();
      await projectPage.navigateToProject('QATest');
      await projectPage.verifyUsersAtProjectIsEmpty();

      await mainPage.navigateToProjectList();

      await projectPage.searchProject('QATest');
      await projectPage.deleteProject();
    });
  });
});
