/**
 * Security API Test Suite
 * Basic security validation tests for API endpoints
 */

const { test, expect } = require('@playwright/test');
const PetService = require('../services/petService');
const ApiAssertions = require('../utils/assertions');
const config = require('../config/config');

test.describe('Security API Tests', () => {
  let petService;

  test.beforeEach(async () => {
    petService = new PetService();
  });

  test.afterEach(async () => {
    await petService.dispose();
  });

  test('@security Should validate Content-Type header in responses', async () => {
    // Given: API endpoint
    // When: Making a GET request
    const response = await petService.findPetsByStatus('available');

    // Then: Response should have proper Content-Type header
    ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
    expect(response.headers['content-type']).toContain('application/json');
  });

  test('@security Should handle SQL injection attempts in parameters', async () => {
    // Given: SQL injection attempt in pet ID
    const sqlInjection = "1' OR '1'='1";

    // When: Attempting to retrieve pet with SQL injection
    const response = await petService.getPetById(sqlInjection);

    // Then: Should handle gracefully without executing SQL
    // API should return error or not found, not execute malicious code
    expect([config.statusCodes.BAD_REQUEST, config.statusCodes.NOT_FOUND]).toContain(
      response.status
    );
  });

  test('@security Should handle XSS attempts in request data', async () => {
    // Given: XSS attempt in pet name
    const xssAttempt = '<script>alert("XSS")</script>';

    // When: Attempting to create pet with XSS payload
    const response = await petService.createPet({
      id: 9999,
      name: xssAttempt,
      status: 'available',
    });

    // Then: Should sanitize or reject malicious input
    // Response should not contain executable script
    if (response.status === config.statusCodes.OK) {
      expect(response.body.name).not.toContain('<script>');
    }
  });

  test('@security Should validate input length boundaries', async () => {
    // Given: Extremely long string input
    const longString = 'A'.repeat(10000);

    // When: Attempting to create pet with extremely long name
    const response = await petService.createPet({
      id: 9998,
      name: longString,
      status: 'available',
    });

    // Then: Should handle or reject oversized input
    expect([config.statusCodes.BAD_REQUEST, config.statusCodes.OK]).toContain(response.status);
  });
});
