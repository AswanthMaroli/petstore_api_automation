/**
 * Configuration module for API test automation framework
 * Centralizes all configuration settings and environment variables
 */

require('dotenv').config();

const config = {
  // API Base Configuration
  baseURL: process.env.BASE_URL || 'https://petstore3.swagger.io/api/v3',
  
  // Authentication
  apiKey: process.env.API_KEY || '',
  bearerToken: process.env.BEARER_TOKEN || '',
  
  // Test Configuration
  timeout: parseInt(process.env.TEST_TIMEOUT || '30000', 10),
  retryCount: parseInt(process.env.RETRY_COUNT || '2', 10),
  
  // Environment
  environment: process.env.ENVIRONMENT || 'staging',
  
  // API Endpoints
  endpoints: {
    pet: '/pet',
    petById: (id) => `/pet/${id}`,
    petByStatus: (status) => `/pet/findByStatus?status=${status}`,
    petByTags: (tags) => `/pet/findByTags?tags=${tags}`,
    storeInventory: '/store/inventory',
    storeOrder: '/store/order',
    storeOrderById: (id) => `/store/order/${id}`,
    user: '/user',
    userByUsername: (username) => `/user/${username}`,
    userLogin: '/user/login',
    userLogout: '/user/logout',
  },
  
  // HTTP Status Codes
  statusCodes: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500,
  },
  
  // Pet Status Values
  petStatus: {
    AVAILABLE: 'available',
    PENDING: 'pending',
    SOLD: 'sold',
  },
};

module.exports = config;
