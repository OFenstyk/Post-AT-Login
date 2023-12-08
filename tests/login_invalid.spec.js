// @ts-check
const { test, expect } = require('@playwright/test');
const { testData } = require('../test-data/login-data.spec');
const { loginFalse } = require('../test-data/commands.spec');

// Test scenario: Login to post.at with invalid credentials
test.describe('Login to post.at with invalid credentials', () => {
  // Iterate over test data for invalid credentials
  testData.forEach(({ usernameFalse, password }) => {
    // Individual test case for invalid credentials
    test(`login with Invalid username: ${usernameFalse}`, async ({ page }) => {
      // Attempt login with invalid credentials
      await loginFalse(page, usernameFalse, password);

      // Add assertions to verify unsuccessful login
      const failedLoginElement = await page.waitForSelector('.kiam-login-failed', { state: 'visible' });
      expect(failedLoginElement).not.toBeNull();
    });
  });
});