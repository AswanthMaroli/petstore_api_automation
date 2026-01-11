/**
 * Store Service - Service layer for Store API endpoints
 * Implements Page Object Model pattern for APIs
 * Encapsulates all Store-related API operations
 */

const ApiClient = require('../clients/apiClient');
const config = require('../config/config');
const logger = require('../utils/logger');

class StoreService {
  constructor() {
    this.apiClient = new ApiClient();
    this.endpoints = config.endpoints;
  }

  /**
   * Get store inventory
   * @returns {Promise<Object>} API response
   */
  async getInventory() {
    logger.info('Getting store inventory');
    const response = await this.apiClient.get(this.endpoints.storeInventory);
    return response;
  }

  /**
   * Place an order
   * @param {Object} orderData - Order data object
   * @returns {Promise<Object>} API response
   */
  async placeOrder(orderData) {
    logger.info(`Placing order for pet ID: ${orderData.petId}`);
    const response = await this.apiClient.post(this.endpoints.storeOrder, orderData);
    return response;
  }

  /**
   * Get order by ID
   * @param {number} orderId - Order ID
   * @returns {Promise<Object>} API response
   */
  async getOrderById(orderId) {
    logger.info(`Getting order with ID: ${orderId}`);
    const response = await this.apiClient.get(this.endpoints.storeOrderById(orderId));
    return response;
  }

  /**
   * Delete an order
   * @param {number} orderId - Order ID
   * @returns {Promise<Object>} API response
   */
  async deleteOrder(orderId) {
    logger.info(`Deleting order with ID: ${orderId}`);
    const response = await this.apiClient.delete(this.endpoints.storeOrderById(orderId));
    return response;
  }

  /**
   * Clean up resources
   */
  async dispose() {
    await this.apiClient.dispose();
  }
}

module.exports = StoreService;
