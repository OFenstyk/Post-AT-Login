  // @ts-check
  const { test } = require('@playwright/test');
  const { testData } = require('../test-data/login-data.spec');
  const { logout } = require('../test-data/commands.spec');
  
  
  test.describe('Login to post.at with valid credentials', () => {
    testData.forEach((data) => {
      test(`login with valid username: ${data.username}`, async ({ page }) => {
        await logout(page, data.username, data.password);
      });
    });
  });