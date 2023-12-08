// @ts-check
const { test, expect } = require('@playwright/test');
const { testData } = require('../test-data/login-data.spec');
const { loginTrue, logout } = require('../test-data/commands.spec');

// Test scenario: Login to post.at with valid credentials
test.describe('Login to post.at with valid credentials', () => {
  // Iterate over test data for valid credentials
  testData.forEach(({ username, password }) => {
    // Individual test case for valid credentials
    test(`login with valid username: ${username}`, async ({ page }) => {
      // Log in with valid credentials
      await loginTrue(page, username, password);

      // Add assertions to verify successful login
      const loggedInElement = await page.waitForSelector('.headerbar__loginAvatar', { state: 'visible' });
      expect(loggedInElement).not.toBeNull();

      // Logout after successful login
      await logout(page, username, password);
    });
  });
});
