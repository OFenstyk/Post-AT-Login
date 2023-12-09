// @ts-check
const { test, expect } = require('@playwright/test');
const { testData } = require('./login-data.spec');

// Function to navigate to the home page and accept cookies
const navigateAndAcceptCookies = async (page, data) => {
  await page.goto(data.home);
  await page.click(data.acceptCoockiesButton);
};

// Function to perform login with username, password, and an indicator for success
const login = async (page, username, password, expectedResult) => {
  for (const data of testData) {
    await navigateAndAcceptCookies(page, data);

    await page.click(data.homepageLoginButton);
    await page.fill(data.usernameField, username);
    await page.fill(data.passwordField, password);
    await page.click(data.loginButton);

    const selectorToWaitFor = expectedResult
      ? data.successfulLoginAvatar
      : data.failedLoginMessage;

    await page.waitForSelector(selectorToWaitFor, { state: 'visible' });

    if (expectedResult) {
      const element = await page.$(data.successfulLoginAvatar);
      expect(element).not.toBeNull();
    }
  }
};

// Function to perform logout
const logout = async (page) => {
  for (const data of testData) {
    await page.click(data.successfulLoginAvatar);
    const logoutButton = await page.waitForSelector(data.logoutButton);
    await logoutButton.click();
  }
};

// Close the browser window after each test
test.afterEach(async ({ browser }) => {
  if (browser.contexts().length > 0) {
    await browser.contexts()[0].close();
  }
});

module.exports = { login, logout };
