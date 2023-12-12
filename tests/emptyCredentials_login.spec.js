// @ts-check
// Load environment variables
require('dotenv').config();

// Import necessary modules and configurations from Playwright
const { test, expect } = require('@playwright/test');
const { login } = require('../test-data/commands.spec');
const { testData } = require('../test-data/login-data.spec');

// Test suite to cover login scenarios with different credentials
test.describe('Login to post.at with different credentials', () => {
  // Iterate through test data
  testData.forEach((data) => {
    // Test case for login with empty fields
    test(`login with Empty fields: ${data.usernameEmpty}`, async ({ page }) => {
      // Perform login with empty fields
      await login(page, data, data.usernameEmpty, data.passwordEmpty, false);

      // Add assertions to verify unsuccessful login
      const failedLoginElement = await page.waitForSelector(data.failedLoginMessage, { state: 'visible' });
      expect(failedLoginElement).not.toBeNull();
    });
  });
});
