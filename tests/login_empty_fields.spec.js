const { test } = require('@playwright/test');
const { testData } = require('../test-data/login-data.spec');
const { loginFalseEmpty } = require('../test-data/commands.spec');

test.describe('Login to post.at with empty fields', () => {
  testData.forEach((data) => {
    test(`login with Empty fields: ${data.emptyUsername}`, async ({ page }) => {
      await loginFalseEmpty(page, data.emptyUsername, data.emptyPassword);
    });
  });
});