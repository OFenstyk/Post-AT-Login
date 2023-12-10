// @ts-check
const { test, expect } = require('@playwright/test');
const { login, logout } = require('../test-data/commands.spec');
const { testData } = require('../test-data/login-data.spec');

test.describe('Login to post.at with different credentials', () => {
  testData.forEach(({ username, password, expectedResult }) => {
    // Test case for login with various credentials
    test(`login with credentials: ${username}`, async ({ page }) => {
      // Perform login with specified credentials
      await login(page, username, password, expectedResult);

      // Add assertions based on the expected result
      if (!expectedResult) {
        const failedLoginElement = await page.waitForSelector('.userlogin__modal-body', { state: 'visible' });
        expect(failedLoginElement).not.toBeNull();
      } else {
        const loggedInElement = await page.waitForSelector('.headerbar__login.logged-in', { state: 'visible' });
        expect(loggedInElement).not.toBeNull();

        // Logout after successful login
        await logout(page);
      }
    });
  });
});