// @ts-check
const { test, expect } = require('@playwright/test');
const { testData } = require('./login-data.spec');

const navigateAndAcceptCookies = async (page, data) => {
  await page.goto(data.home);
  await page.click(data.acceptCoockiesButton);
};

const login = async (page, username, password, shouldSucceed) => {
  for (const data of testData) {
    await navigateAndAcceptCookies(page, data);

    await page.click(data.homepageLoginButton);
    await page.fill(data.usernameField, username);
    await page.fill(data.passwordField, password);
    await page.click(data.loginButton);

    const selectorToWaitFor = shouldSucceed
      ? data.successfulLoginAvatar
      : data.failedLoginMessage;

    await page.waitForSelector(selectorToWaitFor, { state: 'visible' });

    if (shouldSucceed) {
      const element = await page.$(data.successfulLoginAvatar);
      expect(element).not.toBeNull();
    }
  }
};

const loginTrue = async (page, username, password) => {
  await login(page, username, password, true);
};

const loginFalse = async (page, username, password) => {
  await login(page, username, password, false);
};

const loginFalseEmpty = async (page, username, password) => {
  for (const data of testData) {
    await navigateAndAcceptCookies(page, data);

    await page.click(data.homepageLoginButton);
    await page.click(data.loginButton);
  }
};

const logout = async (page, username, password) => {
  for (const data of testData) {
    await page.click(data.successfulLoginAvatar);

    const logoutButton = await page.waitForSelector(data.logoutButton);
    await logoutButton.click();
  }
};

test.afterEach(async ({ browser }) => {
  // Close the browser window after each test
  if (browser.contexts().length > 0) {
    await browser.contexts()[0].close();
  }
});

module.exports = { loginTrue, loginFalse, loginFalseEmpty, logout };