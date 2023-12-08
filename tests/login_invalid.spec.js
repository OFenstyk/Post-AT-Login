// @ts-check
const { test, expect } = require('@playwright/test');
const { testData } = require('../test-data/login-data.spec');
const { loginFalse } = require('../test-data/commands.spec');

test.describe('Login to post.at with invalid credentials', () => {
  testData.forEach(({ usernameFalse, password }) => {
    for (const data of testData) {
    test(`login with Invalid username: ${usernameFalse}`, async ({ page }) => {
      await loginFalse(page, usernameFalse, password);

      // Add assertions to verify unsuccessful login
      const failedLoginElement = await page.waitForSelector(data.failedLoginMessage);
      expect(failedLoginElement).not.toBeNull();
     });
  }});
});
