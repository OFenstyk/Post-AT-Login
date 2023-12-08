// @ts-check
const { test, expect } = require('@playwright/test');
const { testData } = require('../test-data/login-data.spec');
const { loginTrue, logout} = require('../test-data/commands.spec');

test.describe('Login to post.at with valid credentials', () => {
  testData.forEach(({ username, password }) => {
    for (const data of testData) {
    test(`login with valid username: ${username}`, async ({ page }) => {
      await loginTrue(page, username, password);

      // Add assertions to verify successful login
      const loggedInElement = await page.waitForSelector(data.successfulLoginAvatar, { state: 'visible' });
      expect(loggedInElement).not.toBeNull();

      // Logout
      await logout(page, username, password);
    });
  }});
});
