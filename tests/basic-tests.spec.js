// @ts-check
require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { login, logout } = require('../test-data/commands.spec');
const { testData } = require('../test-data/login-data.spec');

test.describe('Login to post.at with different credentials', () => {
  testData.forEach(({ username, password, usernameFalse, passwordFalse, usernameEmpty, passwordEmpty }) => {
    test(`login with Empty fields: ${usernameEmpty}`, async ({ page }) => {
      await login(page, testData[0], usernameEmpty, passwordEmpty, false);
      const failedLoginElement = await page.waitForSelector('.userlogin__modal-body', { state: 'visible' });
      expect(failedLoginElement).not.toBeNull();
    });

    test(`login with valid username: ${username}`, async ({ page }) => {
      await login(page, testData[0], username, password);
      const loggedInElement = await page.waitForSelector('.headerbar__loginAvatar', { state: 'visible' });
      expect(loggedInElement).not.toBeNull();
      await logout(page, testData[0]);
    });

    test(`login with Invalid username: ${usernameFalse}`, async ({ page }) => {
      await login(page, testData[0], usernameFalse, passwordFalse, false);
      const failedLoginElement = await page.waitForSelector('.userlogin__modal-body');
      expect(failedLoginElement).not.toBeNull();
    });
  });
});
