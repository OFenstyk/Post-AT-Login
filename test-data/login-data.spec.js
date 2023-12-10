
// @ts-check
const { expect } = require('@playwright/test');



// Test data for various login scenarios
const testData = [
  {
    // Valid credentials
    username: 'oleksandrfentsyk@gmail.com',
    password: 'Zeppelino211',
    expectedResult: true,

    // Common elements and URLs
    home: 'http://www.post.at/',
    acceptCoockiesButton: '#onetrust-accept-btn-handler',
    homepageLoginButton: '.headerbar__btnText',
    usernameField: '#signInName',
    passwordField: '#password',
    loginButton: '#next',
    successfulLoginAvatar: '.headerbar__login.logged-in',
    logoutButton: '.headerbar__login-submenuitem.logged-in.sub-menu__linkbtn'
  },
  {
    // Empty credentials
    username: '',
    password: '',
    expectedResult: false,

    // Common elements and URLs
    home: 'http://www.post.at/',
    acceptCoockiesButton: '#onetrust-accept-btn-handler',
    homepageLoginButton: '.headerbar__btnText',
    usernameField: '#signInName',
    passwordField: '#password',
    loginButton: '#next',
    failedLoginEmptyUsernamePasswordMessage: '.highlightError'  
  },
  {
    // Invalid credentials
    username: 'oleksandrfensyk@gnail.com',
    password: '1234',
    expectedResult: false,

    // Common elements and URLs
    home: 'http://www.post.at/',
    acceptCoockiesButton: '#onetrust-accept-btn-handler',
    homepageLoginButton: '.headerbar__btnText',
    usernameField: '#signInName',
    passwordField: '#password',
    loginButton: '#next',
    failedLoginMessage: '#kiam-login-failed'
  },
];

module.exports = { testData };