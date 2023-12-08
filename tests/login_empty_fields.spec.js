// @ts-check
const { test, expect } = require('@playwright/test');
const { testData } = require('../test-data/login-data.spec');
const { loginFalseEmpty } = require('../test-data/commands.spec');

test.describe('Login to post.at with empty fields', () => {
  testData.forEach(({ emptyUsername, emptyPassword }) => {
    for (const data of testData) {
    test(`login with Empty fields: ${emptyUsername}`, async ({ page }) => {
      await loginFalseEmpty(page, emptyUsername, emptyPassword);
    });
  }});
});