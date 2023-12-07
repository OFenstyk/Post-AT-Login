// @ts-check
const { test, expect } = require('@playwright/test');

test('login to post.at', async ({ page }) => {
  // Navigate to the login page
  await page.goto('http://www.post.at/');

  //Click on accept or reject coockies
  await page.click('#onetrust-accept-btn-handler');
  
  //Click on login
  await page.click('.headerbar__btnText');
 
  // Fill in the username and password fields
  await page.fill('#signInName', 'oleksandrfentsyk@gmail.com');
  await page.fill('#password', 'Zeppelino211');

  // Click the login button
  await page.click('#next');

  // Wait for navigation or any element indicating successful login
  await page.waitForNavigation();

  // You can add assertions here to verify if the login was successful
  // For example, check if a specific element is present on the dashboard page
  const loggedInElement = await page.waitForSelector('#contextmenu-lg');
  await expect(loggedInElement).toBe;
});
