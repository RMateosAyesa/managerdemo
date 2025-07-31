// playwright.config.js
const { defineConfig } = require('@playwright/test');

const isCI = !!process.env.CI;

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false, // tests de uno en uno
  use: {
    browserName: 'chromium',
    headless: isCI, // Headless solo en CI
    baseURL: 'https://manager.dev.devaid.eu/', // cambia por tu URL real
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
  },
});
