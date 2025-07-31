// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false, // tests de uno en uno
  use: {
    browserName: 'chromium',
    headless: false,
    baseURL: 'https://manager.dev.devaid.eu/', // cambia por tu URL real
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
  },
});
