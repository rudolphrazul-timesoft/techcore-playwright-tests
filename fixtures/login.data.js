/**
 * Test data for login functionality
 * This file contains various test credentials and expected results for login tests
 */

// Login page UI elements for more maintainable selectors
exports.loginPageElements = {
  usernameField: '#username',
  passwordField: '#password',
  loginButton: 'button[type="submit"]',
  forgotPasswordLink: '#forgotPassword',
  errorMessage: '#loginError',
  welcomeHeading: 'h1'
};

// Valid credentials for successful login
exports.validCredentials = [
  {
    username: 'admin',
    password: 'password123',
    role: 'administrator'
  },
  {
  username: 'manager',
   password: 'manager456',
  role: 'manager'
   },
   {
    username: 'user',
     password: 'user789',
     role: 'standard'
 }
];
