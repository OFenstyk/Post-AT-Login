
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
    failedLoginMessage: '.userlogin__modal-body'
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
    failedLoginEmptyUsernamePasswordMessage: '.userlogin__modal-body'  
  }
];

module.exports = { testData };