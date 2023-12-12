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
    // Test case for login with invalid credentials
    test(`login with Invalid username: ${data.usernameFalse}`, async ({ page }) => {
      // Attempt login with invalid credentials
      await login(page, data, data.usernameFalse, data.passwordFalse, false);

      // Add assertions to verify unsuccessful login
      const failedLoginElement = await page.waitForSelector(data.failedLoginEmptyUsernamePasswordMessage);
      expect(failedLoginElement).not.toBeNull();
    });
  });
});
