const { defineConfig } = require('@playwright/test');
const isCI = !!process.env.CI;

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: isCI ? 1 : 0, // opcional
  use: {
    headless: isCI, // solo headless en CI
    browserName: 'chromium',
    baseURL: 'https://manager.dev.devaid.eu/',
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
    video: 'on', // activa grabación de vídeo
  },
  reporter: [['html', { open: 'never' }]],
});
