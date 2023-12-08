// @ts-check
const { test, expect } = require('@playwright/test');
const { testData } = require('../test-data/login-data.spec');
const { loginFalseEmpty } = require('../test-data/commands.spec');

// Test scenario: Login to post.at with empty fields
test.describe('Login to post.at with empty fields', () => {
  // Iterate over test data for empty fields
  testData.forEach(({ emptyUsername, emptyPassword }) => {
    // Individual test case for empty fields
    test(`login with Empty fields: ${emptyUsername}`, async ({ page }) => {
      // Perform login with empty fields
      await loginFalseEmpty(page, emptyUsername, emptyPassword);
    });
  });
});
