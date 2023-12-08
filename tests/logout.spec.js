// @ts-check
const { test, expect } = require('@playwright/test');
const { testData } = require('../test-data/login-data.spec');
const { loginTrue, logout } = require('../test-data/commands.spec');

test.describe('Logout from post.at after successful login', () => {
  testData.forEach(({ username, password }) => {
    for (const data of testData) {
    test(`login and then logout with username: ${username}`, async ({ page }) => {
      await loginTrue(page, username, password);

      // Logout
      await logout(page, username, password);
    });
  }});
});

