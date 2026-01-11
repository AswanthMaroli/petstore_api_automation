/**
 * User Service - Service layer for User API endpoints
 * Implements Page Object Model pattern for APIs
 * Encapsulates all User-related API operations
 */

const ApiClient = require('../clients/apiClient');
const config = require('../config/config');
const logger = require('../utils/logger');

class UserService {
  constructor() {
    this.apiClient = new ApiClient();
    this.endpoints = config.endpoints;
  }

  /**
   * Create a new user
   * @param {Object} userData - User data object
   * @returns {Promise<Object>} API response
   */
  async createUser(userData) {
    logger.info(`Creating user with username: ${userData.username}`);
    const response = await this.apiClient.post(this.endpoints.user, userData);
    return response;
  }

  /**
   * Get user by username
   * @param {string} username - Username
   * @returns {Promise<Object>} API response
   */
  async getUserByUsername(username) {
    logger.info(`Getting user with username: ${username}`);
    const response = await this.apiClient.get(this.endpoints.userByUsername(username));
    return response;
  }

  /**
   * Update an existing user
   * @param {string} username - Username
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} API response
   */
  async updateUser(username, userData) {
    logger.info(`Updating user with username: ${username}`);
    const response = await this.apiClient.put(this.endpoints.userByUsername(username), userData);
    return response;
  }

  /**
   * Delete a user
   * @param {string} username - Username
   * @returns {Promise<Object>} API response
   */
  async deleteUser(username) {
    logger.info(`Deleting user with username: ${username}`);
    const response = await this.apiClient.delete(this.endpoints.userByUsername(username));
    return response;
  }

  /**
   * User login
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Promise<Object>} API response
   */
  async login(username, password) {
    logger.info(`Logging in user: ${username}`);
    const response = await this.apiClient.get(
      `${this.endpoints.userLogin}?username=${username}&password=${password}`
    );
    return response;
  }

  /**
   * User logout
   * @returns {Promise<Object>} API response
   */
  async logout() {
    logger.info('Logging out user');
    const response = await this.apiClient.get(this.endpoints.userLogout);
    return response;
  }

  /**
   * Clean up resources
   */
  async dispose() {
    await this.apiClient.dispose();
  }
}

module.exports = UserService;
