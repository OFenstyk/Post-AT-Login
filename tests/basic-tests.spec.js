// @ts-check
const { test, expect } = require('@playwright/test');
const { testData } = require('../test-data/login-data.spec');
const { loginTrue, loginFalse, loginFalseEmpty, logout } = require('../test-data/commands.spec');

test.describe('Login to post.at with different credentials', () => {
  testData.forEach(({ username, password, usernameFalse, emptyUsername, emptyPassword }) => {
    // Test case for login with empty fields
    test(`login with Empty fields: ${emptyUsername}`, async ({ page }) => {
      // Perform login with empty fields
      await loginFalseEmpty(page, emptyUsername, emptyPassword);

      // Add assertions to verify unsuccessful login
      const failedLoginElement = await page.waitForSelector('.highlightError', { state: 'visible' });
      expect(failedLoginElement).not.toBeNull();
    });

    // Test case for login with valid credentials
    test(`login with valid username: ${username}`, async ({ page }) => {
      // Log in with valid credentials
      await loginTrue(page, username, password);

      // Add assertions to verify successful login
      const loggedInElement = await page.waitForSelector('.headerbar__loginAvatar', { state: 'visible' });
      expect(loggedInElement).not.toBeNull();

      // Logout after successful login
      await logout(page, username, password);
    });

    // Test case for login with invalid credentials
    test(`login with Invalid username: ${usernameFalse}`, async ({ page }) => {
      // Attempt login with invalid credentials
      await loginFalse(page, usernameFalse, password);

      // Add assertions to verify unsuccessful login
      const failedLoginElement = await page.waitForSelector('#kiam-login-failed', { state: 'visible' });
      expect(failedLoginElement).not.toBeNull();
    });
  });
});