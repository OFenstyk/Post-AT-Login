// @ts-check
const { expect } = require('@playwright/test');
const { testData } = require('./login-data.spec');

const loginTrue = async (page, username, password) => {
  for (const data of testData) {
    // Navigate to the login page
    await page.goto(data.home);

    // Click on accept cookies
    await page.click(data.acceptCoockiesButton);

    // Click on login
    await page.click(data.homepageLoginButton);

    // Fill in the username and password fields
    await page.fill(data.usernameField, username);
    await page.fill(data.passwordField, password);

    // Click the login button
    await page.click(data.loginButton);

    // Wait for navigation or any element indicating successful login
    await page.waitForNavigation();

    // You can add assertions here to verify if the login was successful
    // For example, check if a specific element is present on the dashboard page
    const element = await page.waitForSelector('.headerbar__loginAvatar', { state: 'visible' });
    // Assert that the element is visible
    expect(element).not.toBeNull();
  }
};

const loginFalse = async (page, username, password) => {
  for (const data of testData) {
    // Navigate to the login page
    await page.goto(data.home);

    // Click on accept cookies
    await page.click(data.acceptCoockiesButton);

    // Click on login
    await page.click(data.homepageLoginButton);

    // Fill in the username and password fields
    await page.fill(data.usernameField, username);
    await page.fill(data.passwordField, password);

    // Click the login button
    await page.click(data.loginButton);

    // Wait for navigation or any element indicating unsuccessful login
    await page.waitForSelector('#kiam-login-failed');
    
  }
};

module.exports = { loginTrue, loginFalse };