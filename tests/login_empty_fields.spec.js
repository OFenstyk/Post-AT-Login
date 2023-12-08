const { test } = require('@playwright/test');
const { testData, loginFalse } = require('../test-data/login-data.spec');

test.describe('Login to post.at with empty fields', () => {
  testData.forEach((data) => {
    test(`login with Empty fields: ${data.emptyUsername}`, async ({ page }) => {
      await loginFalse(page, data.emptyUsername, data.emptyPassword);
    });
  });
});