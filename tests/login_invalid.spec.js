const { test } = require('@playwright/test');
const { testData } = require('../test-data/login-data.spec');
const { loginFalse } = require('../test-data/commands.spec');

test.describe('Login to post.at with invalid credentials', () => {
  testData.forEach((data) => {
    test(`login with Invalid username: ${data.usernameFalse}`, async ({ page }) => {
      await loginFalse(page, data.usernameFalse, data.password);
    });
  });
});