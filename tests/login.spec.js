const { test, expect } = require('@playwright/test');
const loginData = require('../fixtures/login.data');

// Basic test to verify page accessibility
test('Can access TechCore HR Portal', async ({ page }) => {
  // Navigate directly to the full URL without using baseURL
  await page.goto('https://timesorderpoc.blob.core.windows.net/qa-site/TechCore.html', {
    waitUntil: 'networkidle'
  });
  
  // Verify page title
  const title = await page.title();
  console.log('Page title:', title);
  expect(title).toContain('TechCore HR Portals');
  
  // Verify login form exists
  const loginForm = await page.$('#loginForm');
  expect(loginForm).toBeTruthy();
  
  // Verify username field exists
  const usernameField = await page.$(loginData.loginPageElements.usernameField);
  expect(usernameField).toBeTruthy();
  
  // Verify password field exists
  const passwordField = await page.$(loginData.loginPageElements.passwordField);
  expect(passwordField).toBeTruthy();
  
  // Verify login button exists
  const loginButton = await page.$(loginData.loginPageElements.loginButton);
  expect(loginButton).toBeTruthy();
});

// Test for error message when login form is submitted empty
test('Show error message for empty login form', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://timesorderpoc.blob.core.windows.net/qa-site/TechCore.html', {
    waitUntil: 'networkidle'
  });
  
  // Click login button without entering credentials
  await page.click(loginData.loginPageElements.loginButton);
  
  // Error message should be visible
  await expect(page.locator(loginData.loginPageElements.errorMessage)).toBeVisible();
  
  // Verify error message text
  const errorMessage = await page.locator(loginData.loginPageElements.errorMessage).text();
  expect(errorMessage).toContain('Invalid username or password');
});
 