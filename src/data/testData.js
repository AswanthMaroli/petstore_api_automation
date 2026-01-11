/**
 * Test Data - Externalized test data for API tests
 * Separates test data from test logic for maintainability
 */

const testData = {
  // Pet test data
  pets: {
    validPet: {
      id: 1001,
      name: 'Fluffy',
      category: {
        id: 1,
        name: 'Dogs',
      },
      photoUrls: ['https://example.com/dog1.jpg'],
      tags: [
        { id: 1, name: 'friendly' },
        { id: 2, name: 'playful' },
      ],
      status: 'available',
    },
    updatePet: {
      id: 1001,
      name: 'Fluffy Updated',
      category: {
        id: 1,
        name: 'Dogs',
      },
      photoUrls: ['https://example.com/dog1.jpg'],
      tags: [
        { id: 1, name: 'friendly' },
        { id: 2, name: 'playful' },
      ],
      status: 'sold',
    },
    invalidPet: {
      id: -1,
      name: '',
      status: 'invalid_status',
    },
    petWithMissingFields: {
      name: 'Incomplete Pet',
    },
  },

  // Order test data
  orders: {
    validOrder: {
      id: 2001,
      petId: 1001,
      quantity: 1,
      shipDate: new Date().toISOString(),
      status: 'placed',
      complete: false,
    },
    invalidOrder: {
      id: 'not_a_number',
      petId: -1,
      quantity: -1,
    },
  },

  // User test data
  users: {
    validUser: {
      id: 3001,
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@example.com',
      password: 'password123',
      phone: '1234567890',
      userStatus: 0,
    },
    invalidUser: {
      id: 'invalid',
      username: '',
      email: 'not_an_email',
    },
  },

  // Status values
  statuses: {
    available: 'available',
    pending: 'pending',
    sold: 'sold',
  },

  // Error scenarios
  errors: {
    notFound: {
      code: 1,
      type: 'error',
      message: 'Pet not found',
    },
    invalidInput: {
      code: 405,
      type: 'unknown',
      message: 'Invalid input',
    },
  },
};

module.exports = testData;
