// @ts-check
// Load environment variables
require('dotenv').config();

// Import necessary modules and configurations from Playwright
const { test, expect } = require('@playwright/test');
const { login, logout } = require('../test-data/commands.spec');
const { testData } = require('../test-data/login-data.spec');

// Test suite to cover login scenarios with different credentials
test.describe('Login to post.at with different credentials', () => {
  // Iterate through test data
  testData.forEach((data) => {

    // Test case for login with valid credentials
    test(`login with valid username: ${data.username}`, async ({ page }) => {
      // Log in with valid credentials
      await login(page, data, data.username, data.password);

      // Add assertions to verify successful login
      const loggedInElement = await page.waitForSelector(data.successfulLoginAvatar, { state: 'visible' });
      expect(loggedInElement).not.toBeNull();

      // Logout after successful login
      await logout(page, data);
    });
  });
});
