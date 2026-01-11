/**
 * Test Data Generator utility
 * Generates dynamic test data using Faker library
 */

const { faker } = require('@faker-js/faker');

class TestDataGenerator {
  /**
   * Generate a random pet object
   * @param {Object} overrides - Properties to override
   * @returns {Object} Pet object
   */
  static generatePet(overrides = {}) {
    const pet = {
      id: overrides.id || faker.number.int({ min: 1, max: 999999 }),
      name: overrides.name || faker.person.firstName(),
      category: {
        id: overrides.categoryId || faker.number.int({ min: 1, max: 100 }),
        name: overrides.categoryName || faker.animal.type(),
      },
      photoUrls: overrides.photoUrls || [
        faker.image.url(),
        faker.image.url(),
      ],
      tags: overrides.tags || [
        { id: faker.number.int(), name: faker.word.adjective() },
        { id: faker.number.int(), name: faker.word.adjective() },
      ],
      status: overrides.status || 'available',
    };

    return { ...pet, ...overrides };
  }

  /**
   * Generate a random order object
   * @param {Object} overrides - Properties to override
   * @returns {Object} Order object
   */
  static generateOrder(overrides = {}) {
    const order = {
      id: overrides.id || faker.number.int({ min: 1, max: 999999 }),
      petId: overrides.petId || faker.number.int({ min: 1, max: 1000 }),
      quantity: overrides.quantity || faker.number.int({ min: 1, max: 10 }),
      shipDate: overrides.shipDate || new Date().toISOString(),
      status: overrides.status || 'placed',
      complete: overrides.complete !== undefined ? overrides.complete : false,
    };

    return { ...order, ...overrides };
  }

  /**
   * Generate a random user object
   * @param {Object} overrides - Properties to override
   * @returns {Object} User object
   */
  static generateUser(overrides = {}) {
    const user = {
      id: overrides.id || faker.number.int({ min: 1, max: 999999 }),
      username: overrides.username || faker.internet.userName(),
      firstName: overrides.firstName || faker.person.firstName(),
      lastName: overrides.lastName || faker.person.lastName(),
      email: overrides.email || faker.internet.email(),
      password: overrides.password || faker.internet.password(),
      phone: overrides.phone || faker.phone.number(),
      userStatus: overrides.userStatus !== undefined ? overrides.userStatus : 0,
    };

    return { ...user, ...overrides };
  }

  /**
   * Generate invalid data for negative testing
   * @param {string} type - Type of invalid data ('pet', 'order', 'user')
   * @returns {Object} Invalid data object
   */
  static generateInvalidData(type) {
    const invalidData = {
      pet: {
        id: -1, // Invalid: negative ID
        name: '', // Invalid: empty name
        status: 'invalid_status', // Invalid: not in enum
      },
      order: {
        id: 'not_a_number', // Invalid: string instead of number
        petId: -1, // Invalid: negative ID
        quantity: -1, // Invalid: negative quantity
      },
      user: {
        id: 'invalid', // Invalid: string instead of number
        email: 'not_an_email', // Invalid: not a valid email format
        username: '', // Invalid: empty username
      },
    };

    return invalidData[type] || {};
  }
}

module.exports = TestDataGenerator;
