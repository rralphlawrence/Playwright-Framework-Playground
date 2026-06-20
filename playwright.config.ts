import { defineConfig, devices } from '@playwright/test';
import { allure } from 'allure-playwright';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['github'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['allure-playwright'],
  ],
  outputDir: 'test-results',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

  use: {
    browserName: 'chromium',
    headless: true,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
<<<<<<< HEAD
        // Explicit viewport ensures consistent layout in headless CI
        // (viewport: null + --start-maximized fails in headless mode)
        viewport: { width: 1920, height: 1080 },
=======
        viewport: null,
>>>>>>> origin/Dev
        launchOptions: {
          args: [
            '--disable-blink-features=AutomationControlled',
            '--start-maximized',
          ],
        },
      },
    }
  ],
});
