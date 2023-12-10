// Import Playwright test utilities for assertions
const { test, expect } = require('@playwright/test');

// Import the JSON Web Token (JWT) library
const jwt = require('jsonwebtoken');

// Function to generate a JWT token with a specified user ID
const generateJwtToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

// Function to navigate to the home page and accept cookies
const navigateAndAcceptCookies = async (page, data) => {
  // Navigate to the specified home page URL
  await page.goto(data.home);

  // Wait for and accept cookies using the provided selector
  await page.waitForSelector(data.acceptCoockiesButton);
  await page.click(data.acceptCoockiesButton);
};

// Function to perform login with username, password, and an indicator for success
const login = async (page, data, username, password, expectedResult = true) => {
  // Call the navigateAndAcceptCookies function to prepare the environment
  await navigateAndAcceptCookies(page, data);

  // Click on the login button on the homepage using the provided selector
  await page.click(data.homepageLoginButton);

  // Fill in the username and password fields if provided
  if (username) await page.fill(data.usernameField, username);
  if (password) await page.fill(data.passwordField, password);

  // Click the login button using the provided selector
  await page.click(data.loginButton);

  // Determine which selector to wait for based on the expected result
  const selectorToWaitFor = expectedResult ? data.successfulLoginAvatar : data.failedLoginMessage;

  // Wait for the specified selector to be visible
  await page.waitForSelector(selectorToWaitFor);

  // Check assertions based on the expected result
  if (expectedResult) {
    // For successful login, generate a JWT token and include it in subsequent requests
    const userId = 'c02d3813-d4b9-40a1-9db9-09e34cb9c2e1';
    const jwtToken = generateJwtToken(userId);

    // Include the generated token in the headers of subsequent requests
    await page.setExtraHTTPHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
  } else {
    // For unsuccessful login, verify the presence of the failed login modal body
    const failedLoginElement = await page.waitForSelector('.userlogin__modal-body');
    expect(failedLoginElement).not.toBeNull();
  }
};

// Function to perform logout
const logout = async (page, data) => {
  // Click on the successful login avatar using the provided selector
  await page.click(data.successfulLoginAvatar);

  // Wait for and click on the logout button using the provided selector
  const logoutButton = await page.waitForSelector(data.logoutButton);
  await logoutButton.click();
};

// After each test, close the browser context if there are open contexts
test.afterEach(async ({ browser }) => {
  if (browser.contexts().length > 0) await browser.contexts()[0].close();
});

// Export the login and logout functions for reuse in tests
module.exports = { login, logout };
