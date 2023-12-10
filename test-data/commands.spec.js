// Load environment variables from the .env file
require('dotenv').config();

// Import necessary modules and configurations from Playwright
const { test, expect } = require('@playwright/test');
const jwt = require('jsonwebtoken');

// Import test data containing various login scenarios
const { testData } = require('./login-data.spec');

// Function to generate JWT token
const generateJwtToken = (userId) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
};

// Function to navigate to the home page and accept cookies
const navigateAndAcceptCookies = async (page, data) => {
  // Navigate to the home page
  await page.goto(data.home);

  // Wait for and accept cookies
  await page.waitForSelector(data.acceptCoockiesButton);
  await page.click(data.acceptCoockiesButton);
};

// Function to perform login with username, password, and an indicator for success
const login = async (page, data, username, password, expectedResult = true) => {
  // Navigate to the home page and accept cookies
  await navigateAndAcceptCookies(page, data);

  // Click on the login button on the homepage
  await page.click(data.homepageLoginButton);

  // Fill in username and password fields if provided
  if (username) {
    await page.fill(data.usernameField, username);
  }
  if (password) {
    await page.fill(data.passwordField, password);
  }

  // Click the login button
  await page.click(data.loginButton);

  // Determine which selector to wait for based on the expected result
  const selectorToWaitFor = expectedResult
    ? data.successfulLoginAvatar
    : data.failedLoginMessage;

  // Wait for the specified selector to be visible
  await page.waitForSelector(selectorToWaitFor);

  // Check assertions based on the expected result
  if (expectedResult) {
    // For successful login, generate JWT token and include in subsequent requests
    const userId = 'c02d3813-d4b9-40a1-9db9-09e34cb9c2e1'; // Replace with the actual user ID
    const jwtToken = generateJwtToken(userId);

    // Include the token in the headers of subsequent requests
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
  // Click on the successful login avatar
  await page.click(data.successfulLoginAvatar);

  // Wait for and click on the logout button
  const logoutButton = await page.waitForSelector(data.logoutButton);
  await logoutButton.click();
};

// Close the browser window after each test
test.afterEach(async ({ browser }) => {
  // Check if there are open contexts and close the first one
  if (browser.contexts().length > 0) {
    await browser.contexts()[0].close();
  }
});

// Export the login and logout functions for reuse in tests
module.exports = { login, logout };
