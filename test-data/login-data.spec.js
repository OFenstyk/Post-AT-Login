// @ts-check
const { expect } = require('@playwright/test');


const testData = [
  { 
   username: 'oleksandrfentsyk@gmail.com',
   password: 'Zeppelino211',
   usernameFalse: 'oleksandrfensyk@gnail.com', 
   emptyUsername: '', 
   emptyPassword: '', 
   home: 'http://www.post.at/',
   acceptCoockiesButton: '#onetrust-accept-btn-handler',
   homepageLoginButton: '.headerbar__btnText',
   usernameField: '#signInName',
   passwordField: '#password',
   loginButton: '#next',
   failedLoginMessage: '#kiam-login-failed',
   successfulLoginAvatar: '.headerbar__loginAvatar',
   failedLoginEmptyUsernamePasswordMessage: '.error itemLevel'
 
  }
];

module.exports = { testData };
