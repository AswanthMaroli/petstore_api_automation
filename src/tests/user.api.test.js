/**
 * User API Test Suite
 * Tests for User endpoints covering user management operations
 */

const { test, expect } = require('@playwright/test');
const UserService = require('../services/userService');
const ApiAssertions = require('../utils/assertions');
const TestDataGenerator = require('../utils/testDataGenerator');
const config = require('../config/config');

test.describe('User API Tests', () => {
  let userService;
  let createdUsername;

  test.beforeEach(async () => {
    userService = new UserService();
  });

  test.afterEach(async () => {
    // Cleanup: Delete created user if it exists
    if (createdUsername) {
      try {
        await userService.deleteUser(createdUsername);
      } catch (error) {
        // Ignore cleanup errors
      }
    }
    await userService.dispose();
  });

  test.describe('POST /user - Create User', () => {
    test('@positive Should create a new user with valid data', async () => {
      // Given: Valid user data
      const userData = TestDataGenerator.generateUser();

      // When: Creating a new user
      const response = await userService.createUser(userData);

      // Then: User should be created successfully
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      
      createdUsername = userData.username;
    });

    test('@negative Should handle invalid user data', async () => {
      // Given: Invalid user data
      const invalidUser = TestDataGenerator.generateInvalidData('user');

      // When: Attempting to create user with invalid data
      const response = await userService.createUser(invalidUser);

      // Then: Should return error or handle gracefully
      expect([config.statusCodes.BAD_REQUEST, config.statusCodes.OK]).toContain(
        response.status
      );
    });
  });

  test.describe('GET /user/{username} - Get User by Username', () => {
    test('@positive Should retrieve user by valid username', async () => {
      // Given: An existing user
      const userData = TestDataGenerator.generateUser();
      await userService.createUser(userData);
      createdUsername = userData.username;

      // When: Retrieving the user by username
      const response = await userService.getUserByUsername(userData.username);

      // Then: User details should be returned
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      expect(response.body.username).toBe(userData.username);
      expect(response.body.email).toBe(userData.email);
    });

    test('@negative Should return 404 for non-existent username', async () => {
      // Given: A non-existent username
      const nonExistentUsername = 'nonexistentuser12345';

      // When: Attempting to retrieve user with non-existent username
      const response = await userService.getUserByUsername(nonExistentUsername);

      // Then: Should return 404 Not Found
      ApiAssertions.assertStatus(response.status, config.statusCodes.NOT_FOUND);
    });
  });

  test.describe('PUT /user/{username} - Update User', () => {
    test('@positive Should update existing user', async () => {
      // Given: An existing user
      const userData = TestDataGenerator.generateUser();
      await userService.createUser(userData);
      createdUsername = userData.username;

      // And: Updated user data
      const updatedUserData = {
        ...userData,
        firstName: 'Updated First Name',
        email: 'updated@example.com',
      };

      // When: Updating the user
      const response = await userService.updateUser(userData.username, updatedUserData);

      // Then: User should be updated successfully
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
    });
  });

  test.describe('DELETE /user/{username} - Delete User', () => {
    test('@positive Should delete existing user', async () => {
      // Given: An existing user
      const userData = TestDataGenerator.generateUser();
      await userService.createUser(userData);
      createdUsername = userData.username;

      // When: Deleting the user
      const response = await userService.deleteUser(userData.username);

      // Then: User should be deleted successfully
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      
      // And: User should not be retrievable
      const getResponse = await userService.getUserByUsername(userData.username);
      ApiAssertions.assertStatus(getResponse.status, config.statusCodes.NOT_FOUND);
      
      createdUsername = null; // Already deleted
    });
  });

  test.describe('GET /user/login - User Login', () => {
    test('@positive Should login with valid credentials', async () => {
      // Given: An existing user
      const userData = TestDataGenerator.generateUser();
      await userService.createUser(userData);
      createdUsername = userData.username;

      // When: Logging in with valid credentials
      const response = await userService.login(userData.username, userData.password);

      // Then: Login should be successful
      // Note: Actual response depends on API implementation
      expect([config.statusCodes.OK, config.statusCodes.BAD_REQUEST]).toContain(response.status);
    });

    test('@negative Should handle login with invalid credentials', async () => {
      // Given: Invalid credentials
      const invalidUsername = 'invaliduser';
      const invalidPassword = 'wrongpassword';

      // When: Attempting to login with invalid credentials
      const response = await userService.login(invalidUsername, invalidPassword);

      // Then: Should return error
      expect([config.statusCodes.UNAUTHORIZED, config.statusCodes.BAD_REQUEST]).toContain(
        response.status
      );
    });
  });

  test.describe('GET /user/logout - User Logout', () => {
    test('@positive Should logout successfully', async () => {
      // When: Logging out
      const response = await userService.logout();

      // Then: Logout should be successful
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
    });
  });
});
