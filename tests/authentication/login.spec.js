const { describe, test } = require("@playwright/test");
const { LoginPage } = require('../../pages/login-page');
const { MainPage } = require('../../pages/main-page');

describe("[Functional Test] Manager login", () => {
  //Variable declaration
  let loginPage = null;
  let mainPage = null;

  // 1. Describe configuration
  test.describe.configure({ mode: "serial" });

  // 2. Open main window ##### A diferencia de las apps desktop, en webapps usamos 'page' en vez de 'window' porque trabajamos con navegación url, por eso usamos el método 'goto'
  test.beforeEach(async ({ page }) => {
    await page.goto('');
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
  });

  // 3. Test implementation
  test.describe("When the user credentials are valid", () => {
    test("Should open the starter dashboard", async () => {
      await loginPage.login('managerqa', 'managerqa');

      await mainPage.verifyMainPageIsLoaded();
    });
  });

  test.describe("When the user credentials are not valid", () => {
    test("Should show an authentication error", async () => {
      await loginPage.login("ErrorUser", "ErrorPass");
      await loginPage.verifyLoginFailure();
    });
  });
});
