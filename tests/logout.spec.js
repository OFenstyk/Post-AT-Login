const { test } = require('@playwright/test');
const { testData, loginFalse } = require('../test-data/login-data.spec');

test.describe('Logout form post.at', () => {
  testData.forEach((data) => {
    test(`logout: ${data.emptyUsername}`, async ({ page }) => {
      await loginFalse(page, data.emptyUsername, data.emptyPassword);
    });
  });
});