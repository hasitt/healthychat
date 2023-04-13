const request = require('supertest');
const app = require('/Users/stanhassett/healthychat/src/views/app.js');
const authController = require('./src/controllers/authController');

describe('Auth Controller', () => {
  test('should return true if user is authenticated', () => {
    // mock user object with authenticated property set to true
    const user = { authenticated: true };
    
    // call isAuthenticated method on authController with mock user object
    const result = authController.isAuthenticated({ headers: { authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTZiNjVjNDQ1MTNmNzAwMTdmYmY3YjIiLCJpYXQiOjE2MzA4OTg0OTJ9.vtODQ44-Awu99T52xCv71tWszhJEdPzSRe7-wjtp9zQ' } }, {}, () => {});

    // expect result to be true
    expect(result).toBe(true);
  });

  test('should authenticate user and return JWT', async () => {
    // mock user data
    const userData = {
      email: 'test@example.com',
      password: 'password',
    };

    // create user with mock data
    const createdUser = await request(app)
      .post('/users')
      .send(userData);

    // authenticate user with mock data
    const response = await request(app)
      .post('/auth')
      .send(userData);

    // expect response to have status 200
    expect(response.statusCode).toBe(200);

    // expect response body to have token property
    expect(response.body).toHaveProperty('token');

    // decode JWT to get user ID
    const decodedToken = authController.decodeJwt(response.body.token);

    // expect decoded token to have user ID
    expect(decodedToken).toHaveProperty('userId', createdUser.body._id);
  });
});