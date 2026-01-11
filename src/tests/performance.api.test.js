/**
 * Performance API Test Suite
 * Lightweight performance checks for API endpoints
 */

const { test, expect } = require('@playwright/test');
const PetService = require('../services/petService');
const ApiAssertions = require('../utils/assertions');
const config = require('../config/config');

test.describe('Performance API Tests', () => {
  let petService;

  test.beforeEach(async () => {
    petService = new PetService();
  });

  test.afterEach(async () => {
    await petService.dispose();
  });

  test('@performance Should respond within acceptable time for GET request', async () => {
    // Given: API endpoint
    const startTime = Date.now();

    // When: Making a GET request
    const response = await petService.findPetsByStatus('available');
    const responseTime = Date.now() - startTime;

    // Then: Response should be received within acceptable time
    ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
    ApiAssertions.assertResponseTime(responseTime, 5000); // 5 seconds max
  });

  test('@performance Should handle concurrent requests', async () => {
    // Given: Multiple concurrent requests
    const requests = Array(5).fill(null).map(() => 
      petService.findPetsByStatus('available')
    );

    // When: Executing concurrent requests
    const startTime = Date.now();
    const responses = await Promise.all(requests);
    const totalTime = Date.now() - startTime;

    // Then: All requests should complete successfully
    responses.forEach((response) => {
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
    });

    // And: Total time should be reasonable (not sequential)
    expect(totalTime).toBeLessThan(10000); // Should complete in less than 10 seconds
  });

  test('@performance Should maintain response time under load', async () => {
    // Given: Multiple sequential requests
    const requestCount = 10;
    const responseTimes = [];

    // When: Making multiple requests
    for (let i = 0; i < requestCount; i++) {
      const startTime = Date.now();
      const response = await petService.findPetsByStatus('available');
      const responseTime = Date.now() - startTime;
      responseTimes.push(responseTime);
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
    }

    // Then: Average response time should be acceptable
    const averageTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    expect(averageTime).toBeLessThan(3000); // Average should be less than 3 seconds
  });
});
