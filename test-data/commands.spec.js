// @ts-check
const { test, expect } = require('@playwright/test');
const { testData } = require('./login-data.spec');

// Function to navigate to the home page and accept cookies
const navigateAndAcceptCookies = async (page, data) => {
  await page.goto(data.home);
  await page.click(data.acceptCoockiesButton);
};

// Function to perform login with username, password, and an indicator for success
const login = async (page, username, password, shouldSucceed) => {
  for (const data of testData) {
    await navigateAndAcceptCookies(page, data);

    await page.click(data.homepageLoginButton);
    await page.fill(data.usernameField, username);
    await page.fill(data.passwordField, password);
    await page.click(data.loginButton);

    // Determine the selector to wait for based on the success indicator
    const selectorToWaitFor = shouldSucceed
      ? data.successfulLoginAvatar
      : data.failedLoginMessage;

    // Wait for the specified selector to be visible
    await page.waitForSelector(selectorToWaitFor, { state: 'visible' });

    if (shouldSucceed) {
      // If successful, assert that the login avatar is not null
      const element = await page.$(data.successfulLoginAvatar);
      expect(element).not.toBeNull();
    }
  }
};

// Function to perform a successful login
const loginTrue = async (page, username, password) => {
  await login(page, username, password, true);
};

// Function to perform a failed login
const loginFalse = async (page, username, password) => {
  await login(page, username, password, false);
};

// Function to perform login with empty fields
const loginFalseEmpty = async (page, username, password) => {
  for (const data of testData) {
    await navigateAndAcceptCookies(page, data);

    await page.click(data.homepageLoginButton);
    await page.click(data.loginButton);
  }
};

// Function to perform logout
const logout = async (page, username, password) => {
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

module.exports = { loginTrue, loginFalse, loginFalseEmpty, logout };
