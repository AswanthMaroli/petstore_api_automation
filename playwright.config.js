// @ts-check
const { defineConfig } = require('@playwright/test');
require('dotenv').config();

/**
 * Playwright configuration for API testing
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './src/tests',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use */
  reporter: [
    ['html'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['list']
  ],
  
  /* Shared settings for all the projects below */
  use: {
    /* Base URL for API requests */
    baseURL: process.env.BASE_URL || 'https://petstore3.swagger.io/api/v3',
    
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* Extra HTTP headers */
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },

  /* Configure projects for API testing */
  projects: [
    {
      name: 'api-tests',
      use: {
        // API testing doesn't require browser-specific settings
        // Base URL and headers are configured in the global 'use' section above
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
