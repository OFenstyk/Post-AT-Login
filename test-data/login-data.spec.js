// @ts-check
// Load environment variables
require('dotenv').config();

// Import necessary modules from Playwright for testing
const { expect } = require('@playwright/test');

// Extract credentials and test data from environment variables
const username = process.env.USERNAME_VALID;
const password = process.env.PASSWORD_VALID;
const usernameFalse = process.env.USERNAME_FALSE;
const passwordFalse = process.env.PASSWORD_FALSE;
const usernameEmpty = process.env.USERNAME_EMPTY;
const passwordEmpty = process.env.PASSWORD_EMPTY;
const home = process.env.HOME;

// Test data for various login scenarios
const testData = [
  {
    // Valid credentials
    username,
    password,

    // Invalid credentials
    usernameFalse,
    passwordFalse,

    // Empty fields
    usernameEmpty,
    passwordEmpty,

    // Target URL
    home,

    // Common static elements on the web page
    acceptCoockiesButton: '#onetrust-accept-btn-handler',
    homepageLoginButton: '.headerbar__btnText',
    usernameField: '#signInName',
    passwordField: '#password',
    loginButton: '#next',
    failedLoginMessage: '.userlogin__modal-body',
    successfulLoginAvatar: '.headerbar__loginAvatar',
    failedLoginEmptyUsernamePasswordMessage: '.userlogin__modal-body',
    logoutButton: '.headerbar__login-submenuitem.logged-in.sub-menu__linkbtn',
  },
];

// Export the test data for use in test scripts
module.exports = { testData };
