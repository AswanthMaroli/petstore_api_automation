/**
 * Store API Test Suite
 * Tests for Store endpoints covering inventory and order operations
 */

const { test, expect } = require('@playwright/test');
const StoreService = require('../services/storeService');
const ApiAssertions = require('../utils/assertions');
const TestDataGenerator = require('../utils/testDataGenerator');
const config = require('../config/config');

test.describe('Store API Tests', () => {
  let storeService;
  let createdOrderId;

  test.beforeEach(async () => {
    storeService = new StoreService();
  });

  test.afterEach(async () => {
    // Cleanup: Delete created order if it exists
    if (createdOrderId) {
      try {
        await storeService.deleteOrder(createdOrderId);
      } catch (error) {
        // Ignore cleanup errors
      }
    }
    await storeService.dispose();
  });

  test.describe('GET /store/inventory - Get Inventory', () => {
    test('@smoke @positive Should retrieve store inventory', async () => {
      // Given: Store inventory endpoint is available
      
      // When: Retrieving store inventory
      const response = await storeService.getInventory();

      // Then: Inventory should be returned
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      expect(typeof response.body).toBe('object');
      
      // And: Inventory should contain status counts
      // Note: Actual structure depends on API implementation
    });
  });

  test.describe('POST /store/order - Place Order', () => {
    test('@positive Should place a new order with valid data', async () => {
      // Given: Valid order data
      const orderData = TestDataGenerator.generateOrder();

      // When: Placing a new order
      const response = await storeService.placeOrder(orderData);

      // Then: Order should be placed successfully
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      expect(response.body.id).toBe(orderData.id);
      expect(response.body.petId).toBe(orderData.petId);
      expect(response.body.quantity).toBe(orderData.quantity);
      ApiAssertions.assertFieldExists(response.body, 'status');
      
      createdOrderId = response.body.id;
    });

    test('@negative Should handle invalid order data', async () => {
      // Given: Invalid order data
      const invalidOrder = TestDataGenerator.generateInvalidData('order');

      // When: Attempting to place order with invalid data
      const response = await storeService.placeOrder(invalidOrder);

      // Then: Should return error
      expect([config.statusCodes.BAD_REQUEST, config.statusCodes.INTERNAL_SERVER_ERROR]).toContain(
        response.status
      );
    });

    test('@boundary Should handle order with maximum quantity', async () => {
      // Given: Order with maximum quantity
      const orderData = TestDataGenerator.generateOrder({ quantity: 999 });

      // When: Placing order with maximum quantity
      const response = await storeService.placeOrder(orderData);

      // Then: Order should be placed successfully
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      expect(response.body.quantity).toBe(orderData.quantity);
      
      createdOrderId = response.body.id;
    });
  });

  test.describe('GET /store/order/{orderId} - Get Order by ID', () => {
    test('@positive Should retrieve order by valid ID', async () => {
      // Given: An existing order
      const orderData = TestDataGenerator.generateOrder();
      const createResponse = await storeService.placeOrder(orderData);
      const orderId = createResponse.body.id;
      createdOrderId = orderId;

      // When: Retrieving the order by ID
      const response = await storeService.getOrderById(orderId);

      // Then: Order details should be returned
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      expect(response.body.id).toBe(orderId);
      expect(response.body.petId).toBe(orderData.petId);
    });

    test('@negative Should return 404 for non-existent order ID', async () => {
      // Given: A non-existent order ID
      const nonExistentId = 999999999;

      // When: Attempting to retrieve order with non-existent ID
      const response = await storeService.getOrderById(nonExistentId);

      // Then: Should return 404 Not Found
      ApiAssertions.assertStatus(response.status, config.statusCodes.NOT_FOUND);
    });
  });

  test.describe('DELETE /store/order/{orderId} - Delete Order', () => {
    test('@positive Should delete existing order', async () => {
      // Given: An existing order
      const orderData = TestDataGenerator.generateOrder();
      const createResponse = await storeService.placeOrder(orderData);
      const orderId = createResponse.body.id;
      createdOrderId = orderId;

      // When: Deleting the order
      const response = await storeService.deleteOrder(orderId);

      // Then: Order should be deleted successfully
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      
      // And: Order should not be retrievable
      const getResponse = await storeService.getOrderById(orderId);
      ApiAssertions.assertStatus(getResponse.status, config.statusCodes.NOT_FOUND);
      
      createdOrderId = null; // Already deleted
    });

    test('@negative Should return 404 when deleting non-existent order', async () => {
      // Given: A non-existent order ID
      const nonExistentId = 999999999;

      // When: Attempting to delete non-existent order
      const response = await storeService.deleteOrder(nonExistentId);

      // Then: Should return 404 Not Found
      ApiAssertions.assertStatus(response.status, config.statusCodes.NOT_FOUND);
    });
  });
});
