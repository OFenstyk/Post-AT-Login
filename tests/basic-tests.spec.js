// @ts-check
const { test, expect } = require('@playwright/test');
const { login, logout } = require('../test-data/commands.spec');
const { testData } = require('../test-data/login-data.spec');

test.describe('Login to post.at with different credentials', () => {
  testData.forEach(({ username, password, expectedResult }) => {
    // Test case for login with empty fields
    test(`login with Empty fields: ${username}`, async ({ page }) => {
      await login(page, username, password, false);

      // Add assertions to verify unsuccessful login
      const failedLoginElement = await page.waitForSelector('.error itemLevel', { state: 'visible' });
      expect(failedLoginElement).not.toBeNull();
    });

    // Test case for login with valid credentials
    test(`login with valid username: ${username}`, async ({ page }) => {
      await login(page, username, password, true);

      // Add assertions to verify successful login
      const loggedInElement = await page.waitForSelector('.headerbar__login logged-in', { state: 'visible' });
      expect(loggedInElement).not.toBeNull();

      // Logout after successful login
      await logout(page);
    });

    // Test case for login with invalid credentials
    test(`login with Invalid username: ${username}`, async ({ page }) => {
      await login(page, username, password, null);

      // Add assertions to verify unsuccessful login
      const failedLoginElement = await page.waitForSelector('#kiam-login-failed', { state: 'visible' });
      expect(failedLoginElement).not.toBeNull();
    });
  });
});
