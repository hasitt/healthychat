const authController = require('../src/controllers/authController');

test('should return true if user is authenticated', () => {
  // mock user object with authenticated property set to true
  const user = { authenticated: true };
  
  // call isAuthenticated method on authController with mock user object
  const result = authController.isAuthenticated(user);
  
  // expect result to be true
  expect(result).toBe(true);
});