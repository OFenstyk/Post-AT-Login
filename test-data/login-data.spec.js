// @ts-check
require('dotenv').config();
const { expect } = require('@playwright/test');

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

    // Common elements and URLs
    home,
    acceptCoockiesButton: '#onetrust-accept-btn-handler',
    homepageLoginButton: '.headerbar__btnText',
    usernameField: '#signInName',
    passwordField: '#password',
    loginButton: '#next',
    failedLoginMessage: '#kiam-login-failed',
    successfulLoginAvatar: '.headerbar__loginAvatar',
    failedLoginEmptyUsernamePasswordMessage: '.error_itemLevel',
    logoutButton: '.headerbar__login-submenuitem.logged-in.sub-menu__linkbtn',
  },
];

module.exports = { testData };
