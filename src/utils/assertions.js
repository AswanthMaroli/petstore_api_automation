/**
 * Custom assertion utilities for API testing
 * Extends Playwright's expect with API-specific assertions
 */

const { expect } = require('@playwright/test');
const Ajv = require('ajv');
const logger = require('./logger');

class ApiAssertions {
  /**
   * Assert response status code
   * @param {number} actualStatus - Actual status code
   * @param {number} expectedStatus - Expected status code
   * @param {string} message - Optional error message
   */
  static assertStatus(actualStatus, expectedStatus, message = '') {
    const errorMsg = message || 
      `Expected status code ${expectedStatus}, but got ${actualStatus}`;
    expect(actualStatus, errorMsg).toBe(expectedStatus);
    logger.info(`✓ Status code assertion passed: ${actualStatus}`);
  }

  /**
   * Assert response body matches expected data
   * @param {Object} actualBody - Actual response body
   * @param {Object} expectedBody - Expected response body
   * @param {string} message - Optional error message
   */
  static assertBody(actualBody, expectedBody, message = '') {
    const errorMsg = message || 'Response body does not match expected data';
    expect(actualBody).toMatchObject(expectedBody);
    logger.info('✓ Response body assertion passed');
  }

  /**
   * Assert response contains specific field
   * @param {Object} responseBody - Response body
   * @param {string} field - Field name to check
   * @param {*} expectedValue - Expected value (optional)
   */
  static assertFieldExists(responseBody, field, expectedValue = undefined) {
    expect(responseBody).toHaveProperty(field);
    if (expectedValue !== undefined) {
      expect(responseBody[field]).toBe(expectedValue);
    }
    logger.info(`✓ Field assertion passed: ${field}`);
  }

  /**
   * Assert response header
   * @param {Object} headers - Response headers
   * @param {string} headerName - Header name
   * @param {string} expectedValue - Expected header value
   */
  static assertHeader(headers, headerName, expectedValue) {
    const actualValue = headers[headerName.toLowerCase()];
    expect(actualValue).toBe(expectedValue);
    logger.info(`✓ Header assertion passed: ${headerName}`);
  }

  /**
   * Assert response time is within acceptable range
   * @param {number} responseTime - Response time in milliseconds
   * @param {number} maxTime - Maximum acceptable time
   */
  static assertResponseTime(responseTime, maxTime = 5000) {
    expect(responseTime).toBeLessThan(maxTime);
    logger.info(`✓ Response time assertion passed: ${responseTime}ms < ${maxTime}ms`);
  }

  /**
   * Validate JSON schema
   * @param {Object} data - Data to validate
   * @param {Object} schema - JSON schema
   * @returns {boolean} True if valid
   */
  static validateSchema(data, schema) {
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      logger.error('Schema validation failed:');
      logger.error(JSON.stringify(validate.errors, null, 2));
      throw new Error(`Schema validation failed: ${JSON.stringify(validate.errors)}`);
    }

    logger.info('✓ Schema validation passed');
    return true;
  }

  /**
   * Assert response is an array
   * @param {*} responseBody - Response body
   * @param {number} minLength - Minimum array length (optional)
   */
  static assertIsArray(responseBody, minLength = undefined) {
    expect(Array.isArray(responseBody)).toBe(true);
    if (minLength !== undefined) {
      expect(responseBody.length).toBeGreaterThanOrEqual(minLength);
    }
    logger.info('✓ Array assertion passed');
  }

  /**
   * Assert error response structure
   * @param {Object} responseBody - Error response body
   * @param {number} expectedCode - Expected error code
   * @param {string} expectedType - Expected error type
   */
  static assertErrorResponse(responseBody, expectedCode, expectedType) {
    expect(responseBody).toHaveProperty('code');
    expect(responseBody).toHaveProperty('type');
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.code).toBe(expectedCode);
    expect(responseBody.type).toBe(expectedType);
    logger.info('✓ Error response assertion passed');
  }
}

module.exports = ApiAssertions;
