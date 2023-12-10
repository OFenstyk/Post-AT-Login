// @ts-check
require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { login, logout } = require('../test-data/commands.spec');

test.describe('Login to post.at with different credentials', () => {
  const { testData } = require('../test-data/login-data.spec');

  testData.forEach(({ username, password, usernameFalse, passwordFalse, usernameEmpty, passwordEmpty }) => {
    // Test case for login with empty fields
    test(`login with Empty fields: ${usernameEmpty}`, async ({ page }) => {
      // Perform login with empty fields
      await login(page, testData[0], usernameEmpty, passwordEmpty, false);

      // Add assertions to verify unsuccessful login
      const failedLoginElement = await page.waitForSelector('.userlogin__modal-body', { state: 'visible' });
      expect(failedLoginElement).not.toBeNull();
    });

    // Test case for login with valid credentials
    test(`login with valid username: ${username}`, async ({ page }) => {
      // Log in with valid credentials
      await login(page, testData[0], username, password);

      // Add assertions to verify successful login
      const loggedInElement = await page.waitForSelector('.headerbar__loginAvatar', { state: 'visible' });
      expect(loggedInElement).not.toBeNull();

      // Logout after successful login
      await logout(page, testData[0]);
    });

    // Test case for login with invalid credentials
    test(`login with Invalid username: ${usernameFalse}`, async ({ page }) => {
      // Attempt login with invalid credentials
      await login(page, testData[0], usernameFalse, passwordFalse, false);

      // Add assertions to verify unsuccessful login
      const failedLoginElement = await page.waitForSelector('.userlogin__modal-body');
      expect(failedLoginElement).not.toBeNull();
    });
  });
});
