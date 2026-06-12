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
    viewport: { width: 1920, height: 10880 },
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: ['--start-maximized',
            '--disable-blink-features=AutomationControlled'
          ],
        },
      },
    }
  ],
});