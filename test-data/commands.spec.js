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
  // Call navigateAndAcceptCookies outside the loop
  const firstTestData = testData[0]; // Assuming you have at least one set of test data
  await navigateAndAcceptCookies(page, firstTestData);

 
      await page.click(firstTestData.homepageLoginButton);
      await page.fill(firstTestData.usernameField, username);
      await page.fill(firstTestData.passwordField, password);
      await page.click(firstTestData.loginButton);

      const selectorToWaitFor = expectedResult
          ? firstTestData.successfulLoginAvatar
          : firstTestData.failedLoginMessage || firstTestData.failedLoginEmptyUsernamePasswordMessage;

      await page.waitForSelector(selectorToWaitFor, { state: 'visible' });

      if (expectedResult) {
          const element = await page.$(firstTestData.successfulLoginAvatar);
          expect(element).not.toBeNull();
      }
  
};


// Function to perform logout
const logout = async (page) => {
  const firstTestData = testData[0]; // Assuming you have at least one set of test data
    await page.click(firstTestData.successfulLoginAvatar);
    const logoutButton = await page.waitForSelector(firstTestData.logoutButton);
    await logoutButton.click();
  
};

// Close the browser window after each test
test.afterEach(async ({ browser }) => {
  if (browser.contexts().length > 0) {
    await browser.contexts()[0].close();
  }
});

module.exports = { login, logout };
