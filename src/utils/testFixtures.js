/**
 * Test Fixtures - Reusable test setup and teardown utilities
 * Provides common test fixtures for API testing
 */

const PetService = require('../services/petService');
const StoreService = require('../services/storeService');
const UserService = require('../services/userService');
const TestDataGenerator = require('./testDataGenerator');

class TestFixtures {
  /**
   * Create a test pet and return cleanup function
   * @returns {Promise<{pet: Object, cleanup: Function}>}
   */
  static async createTestPet(petData = null) {
    const petService = new PetService();
    const data = petData || TestDataGenerator.generatePet();
    const response = await petService.createPet(data);
    const petId = response.body.id;

    return {
      pet: response.body,
      petId: petId,
      service: petService,
      cleanup: async () => {
        try {
          await petService.deletePet(petId);
          await petService.dispose();
        } catch (error) {
          // Ignore cleanup errors
        }
      },
    };
  }

  /**
   * Create a test order and return cleanup function
   * @returns {Promise<{order: Object, cleanup: Function}>}
   */
  static async createTestOrder(orderData = null) {
    const storeService = new StoreService();
    const data = orderData || TestDataGenerator.generateOrder();
    const response = await storeService.placeOrder(data);
    const orderId = response.body.id;

    return {
      order: response.body,
      orderId: orderId,
      service: storeService,
      cleanup: async () => {
        try {
          await storeService.deleteOrder(orderId);
          await storeService.dispose();
        } catch (error) {
          // Ignore cleanup errors
        }
      },
    };
  }

  /**
   * Create a test user and return cleanup function
   * @returns {Promise<{user: Object, cleanup: Function}>}
   */
  static async createTestUser(userData = null) {
    const userService = new UserService();
    const data = userData || TestDataGenerator.generateUser();
    await userService.createUser(data);

    return {
      user: data,
      username: data.username,
      service: userService,
      cleanup: async () => {
        try {
          await userService.deleteUser(data.username);
          await userService.dispose();
        } catch (error) {
          // Ignore cleanup errors
        }
      },
    };
  }
}

module.exports = TestFixtures;
