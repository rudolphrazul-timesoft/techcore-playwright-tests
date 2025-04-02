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
  expect(title).toContain('TechCore HR Portal');
  
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
  const errorMessage = await page.locator(loginData.loginPageElements.errorMessage).textContent();
  expect(errorMessage).toContain('Invalid username or password');
});

// Data-driven test for login functionality using credentials from login.data.js
for (const testCase of loginData.validCredentials) {
  test(`Login with ${testCase.role} credentials: ${testCase.username}`, async ({ page }) => {
    // Navigate to the page
    await page.goto('https://timesorderpoc.blob.core.windows.net/qa-site/TechCore.html', {
      waitUntil: 'networkidle'
    });
    
    // Verify we're on the login page
    await expect(page.locator('#loginForm')).toBeVisible();
    
    // Fill in the username
    await page.fill(loginData.loginPageElements.usernameField, testCase.username);
    console.log(`Entered username: ${testCase.username}`);
    
    // Fill in the password
    await page.fill(loginData.loginPageElements.passwordField, testCase.password);
    console.log(`Entered password: ${testCase.password}`);
    
    // Click the login button
    await page.click(loginData.loginPageElements.loginButton);
    console.log('Clicked login button');
    
    // Verify successful login by checking for dashboard
    await expect(page.locator('.dashboard')).toBeVisible({ timeout: 5000 });
    console.log('Dashboard is visible');
    
    // Verify the login form is hidden
    await expect(page.locator('.login-form')).toBeHidden();
    console.log('Login form is hidden');
    
    // Take a screenshot of the dashboard
    await page.screenshot({ path: `login-successful-${testCase.role}.png` });
    console.log(`Screenshot saved as login-successful-${testCase.role}.png`);
  });
}