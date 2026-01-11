/**
 * API Client - Base HTTP client for making API requests
 * Provides a centralized way to handle HTTP requests with authentication,
 * error handling, and logging
 */

const { request } = require('@playwright/test');
const config = require('../config/config');
const logger = require('../utils/logger');

class ApiClient {
  constructor(baseURL = config.baseURL) {
    this.baseURL = baseURL;
    this.context = null;
  }

  /**
   * Initialize API context with authentication headers
   * @param {Object} options - Request options
   */
  async initContext(options = {}) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add authentication headers if available
    if (config.apiKey) {
      headers['X-API-Key'] = config.apiKey;
    }
    if (config.bearerToken) {
      headers['Authorization'] = `Bearer ${config.bearerToken}`;
    }

    this.context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: headers,
      ...options,
    });

    return this.context;
  }

  /**
   * Make GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response object
   */
  async get(endpoint, options = {}) {
    try {
      if (!this.context) {
        await this.initContext();
      }

      logger.info(`GET ${endpoint}`);
      const response = await this.context.get(endpoint, options);
      const responseBody = await response.json().catch(() => ({}));
      
      logger.info(`Response Status: ${response.status()}`);
      logger.debug(`Response Body: ${JSON.stringify(responseBody, null, 2)}`);

      return {
        status: response.status(),
        headers: response.headers(),
        body: responseBody,
        response: response,
      };
    } catch (error) {
      logger.error(`GET request failed for ${endpoint}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Make POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response object
   */
  async post(endpoint, data = {}, options = {}) {
    try {
      if (!this.context) {
        await this.initContext();
      }

      logger.info(`POST ${endpoint}`);
      logger.debug(`Request Body: ${JSON.stringify(data, null, 2)}`);
      
      const response = await this.context.post(endpoint, {
        data: data,
        ...options,
      });
      const responseBody = await response.json().catch(() => ({}));
      
      logger.info(`Response Status: ${response.status()}`);
      logger.debug(`Response Body: ${JSON.stringify(responseBody, null, 2)}`);

      return {
        status: response.status(),
        headers: response.headers(),
        body: responseBody,
        response: response,
      };
    } catch (error) {
      logger.error(`POST request failed for ${endpoint}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Make PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response object
   */
  async put(endpoint, data = {}, options = {}) {
    try {
      if (!this.context) {
        await this.initContext();
      }

      logger.info(`PUT ${endpoint}`);
      logger.debug(`Request Body: ${JSON.stringify(data, null, 2)}`);
      
      const response = await this.context.put(endpoint, {
        data: data,
        ...options,
      });
      const responseBody = await response.json().catch(() => ({}));
      
      logger.info(`Response Status: ${response.status()}`);
      logger.debug(`Response Body: ${JSON.stringify(responseBody, null, 2)}`);

      return {
        status: response.status(),
        headers: response.headers(),
        body: responseBody,
        response: response,
      };
    } catch (error) {
      logger.error(`PUT request failed for ${endpoint}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Make DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response object
   */
  async delete(endpoint, options = {}) {
    try {
      if (!this.context) {
        await this.initContext();
      }

      logger.info(`DELETE ${endpoint}`);
      
      const response = await this.context.delete(endpoint, options);
      const responseBody = await response.json().catch(() => ({}));
      
      logger.info(`Response Status: ${response.status()}`);
      logger.debug(`Response Body: ${JSON.stringify(responseBody, null, 2)}`);

      return {
        status: response.status(),
        headers: response.headers(),
        body: responseBody,
        response: response,
      };
    } catch (error) {
      logger.error(`DELETE request failed for ${endpoint}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Clean up API context
   */
  async dispose() {
    if (this.context) {
      await this.context.dispose();
      this.context = null;
    }
  }
}

module.exports = ApiClient;
