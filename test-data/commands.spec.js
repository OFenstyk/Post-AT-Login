const { test, expect } = require('@playwright/test');
const jwt = require('jsonwebtoken');

const generateJwtToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

const navigateAndAcceptCookies = async (page, data) => {
  await page.goto(data.home);
  await page.waitForSelector(data.acceptCoockiesButton);
  await page.click(data.acceptCoockiesButton);
};

const login = async (page, data, username, password, expectedResult = true) => {
  await navigateAndAcceptCookies(page, data);
  await page.click(data.homepageLoginButton);

  if (username) await page.fill(data.usernameField, username);
  if (password) await page.fill(data.passwordField, password);

  await page.click(data.loginButton);
  const selectorToWaitFor = expectedResult ? data.successfulLoginAvatar : data.failedLoginMessage;
  await page.waitForSelector(selectorToWaitFor);

  if (expectedResult) {
    const userId = 'c02d3813-d4b9-40a1-9db9-09e34cb9c2e1';
    const jwtToken = generateJwtToken(userId);
    await page.setExtraHTTPHeaders({ Authorization: `Bearer ${jwtToken}` });

  } else {
    const failedLoginElement = await page.waitForSelector('.userlogin__modal-body');
    expect(failedLoginElement).not.toBeNull();
  }
};

const logout = async (page, data) => {
  await page.click(data.successfulLoginAvatar);
  const logoutButton = await page.waitForSelector(data.logoutButton);
  await logoutButton.click();
};

test.afterEach(async ({ browser }) => {
  if (browser.contexts().length > 0) await browser.contexts()[0].close();
});

module.exports = { login, logout };
