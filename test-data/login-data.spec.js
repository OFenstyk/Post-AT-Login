// @ts-check
const { expect } = require('@playwright/test');

// Test data for various login scenarios
const testData = [
  { 
    // Valid credentials
    username: 'oleksandrfentsyk@gmail.com',
    password: 'Zeppelino211',
    expectedResult: Boolean, // Indicate the expected result type (Boolean in this case)

    // Invalid credentials
    usernameFalse: 'oleksandrfensyk@gnail.com', 

    // Empty fields
    emptyUsername: '', 
    emptyPassword: '', 

    // Common elements and URLs
    home: 'http://www.post.at/',
    acceptCoockiesButton: '#onetrust-accept-btn-handler',
    homepageLoginButton: '.headerbar__btnText',
    usernameField: '#signInName',
    passwordField: '#password',
    loginButton: '#next',
    failedLoginMessage: '#kiam-login-failed',
    successfulLoginAvatar: '.headerbar__loginAvatar',
    failedLoginEmptyUsernamePasswordMessage: '.error_itemLevel',
    logoutButton: '.headerbar__login-submenuitem.logged-in.sub-menu__linkbtn'
  }
];

module.exports = { testData };
