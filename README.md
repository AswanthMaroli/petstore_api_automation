# API Test Automation Framework

A comprehensive, production-ready API Test Automation Framework built with **JavaScript** and **Playwright** for testing RESTful APIs. This framework follows industry best practices and implements a structured approach to API testing.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Strategy](#test-strategy)
- [Framework Architecture](#framework-architecture)
- [Best Practices](#best-practices)
- [CI/CD Integration](#cicd-integration)
- [Reporting](#reporting)
- [Contributing](#contributing)

## 🎯 Overview

This framework provides a complete solution for API testing with:

- **RESTful API Testing** - Comprehensive coverage for GET, POST, PUT, DELETE operations
- **Service Layer Pattern** - Page Object Model equivalent for APIs
- **Schema Validation** - JSON schema validation using Ajv
- **Test Data Management** - Externalized test data with dynamic generation
- **Comprehensive Reporting** - Allure and HTML reports
- **CI/CD Ready** - GitHub Actions integration
- **Best Practices** - Clean, maintainable, and scalable code structure

## ✨ Features

- ✅ **Functional Testing** - Positive, negative, and boundary test cases
- ✅ **Status Code Validation** - Comprehensive HTTP status code assertions
- ✅ **Schema Validation** - JSON schema validation for response structure
- ✅ **Negative Testing** - Invalid data and error scenario coverage
- ✅ **Security Testing** - Basic security validations (SQL injection, XSS)
- ✅ **Performance Testing** - Lightweight performance checks
- ✅ **Data Management** - Externalized test data with Faker integration
- ✅ **Logging** - Structured logging with configurable levels
- ✅ **Reporting** - Allure and HTML test reports
- ✅ **CI/CD Integration** - GitHub Actions pipeline

## 📁 Project Structure

```
petstore_api_automation/
├── src/
│   ├── config/              # Configuration files
│   │   └── config.js        # Centralized configuration
│   ├── clients/             # API client layer
│   │   └── apiClient.js     # Base HTTP client
│   ├── services/            # Service layer (POM equivalent)
│   │   ├── petService.js    # Pet API service
│   │   ├── storeService.js  # Store API service
│   │   └── userService.js   # User API service
│   ├── tests/               # Test cases
│   │   ├── pet.api.test.js      # Pet API tests
│   │   ├── store.api.test.js    # Store API tests
│   │   ├── user.api.test.js     # User API tests
│   │   ├── security.api.test.js # Security tests
│   │   └── performance.api.test.js # Performance tests
│   ├── schemas/             # JSON schemas
│   │   └── petSchema.js     # Schema definitions
│   ├── utils/               # Utility functions
│   │   ├── logger.js        # Logging utility
│   │   ├── assertions.js    # Custom assertions
│   │   └── testDataGenerator.js # Test data generator
│   └── data/                # Test data
│       └── testData.js      # Externalized test data
├── .github/
│   └── workflows/
│       └── api-tests.yml    # CI/CD pipeline
├── playwright.config.js     # Playwright configuration
├── package.json             # Dependencies
└── README.md                # Documentation
```

### Folder Purpose

- **config/** - Centralizes all configuration settings, endpoints, and environment variables
- **clients/** - Base HTTP client for making API requests with authentication and error handling
- **services/** - Service layer implementing Page Object Model pattern for APIs, encapsulating API operations
- **tests/** - Test cases organized by API resource, following Given-When-Then format
- **schemas/** - JSON schema definitions for response validation
- **utils/** - Reusable utility functions (logging, assertions, data generation)
- **data/** - Externalized test data separated from test logic

## 🔧 Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Git** (for version control)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd petstore_api_automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers** (if needed)
   ```bash
   npx playwright install
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
BASE_URL=https://petstore3.swagger.io/api/v3
API_KEY=your_api_key_here
BEARER_TOKEN=your_bearer_token_here
TEST_TIMEOUT=30000
RETRY_COUNT=2
ENVIRONMENT=staging
LOG_LEVEL=INFO
```

### Playwright Configuration

The `playwright.config.js` file contains:
- Test directory configuration
- Base URL settings
- Reporter configuration (HTML, Allure, List)
- Retry and timeout settings
- Parallel execution settings

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in UI Mode
```bash
npm run test:ui
```

### Run Tests in Headed Mode
```bash
npm run test:headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Smoke Tests Only
```bash
npm run test:smoke
```

### Run Regression Tests Only
```bash
npm run test:regression
```

### Generate and View Allure Report
```bash
npm run test:report
```

## 📊 Test Strategy

### Scope of Testing

#### In-Scope
- ✅ Functional testing (CRUD operations)
- ✅ Status code validation
- ✅ Schema validation
- ✅ Negative testing
- ✅ Boundary testing
- ✅ Basic security validation
- ✅ Lightweight performance checks

#### Out-of-Scope
- ❌ Load testing (use dedicated tools like JMeter, K6)
- ❌ Penetration testing (use specialized security tools)
- ❌ UI testing (use Playwright for web UI)

### Test Case Design

Tests follow **Given-When-Then** format:

```javascript
test('Should create a new pet with valid data', async () => {
  // Given: Valid pet data
  const petData = TestDataGenerator.generatePet();

  // When: Creating a new pet
  const response = await petService.createPet(petData);

  // Then: Pet should be created successfully
  ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
  ApiAssertions.assertBody(response.body, petData);
});
```

### Test Categories

- **@smoke** - Critical path tests
- **@regression** - Full regression suite
- **@positive** - Happy path scenarios
- **@negative** - Error scenarios
- **@boundary** - Boundary value testing
- **@security** - Security validations
- **@performance** - Performance checks

## 🏗️ Framework Architecture

### 1. API Client Layer

The `ApiClient` class provides a centralized HTTP client:

```javascript
const apiClient = new ApiClient();
const response = await apiClient.get('/pet/123');
```

**Features:**
- Automatic authentication header injection
- Request/response logging
- Error handling
- Context management

### 2. Service Layer (POM Equivalent)

Services encapsulate API operations:

```javascript
const petService = new PetService();
const response = await petService.createPet(petData);
```

**Benefits:**
- Separation of concerns
- Reusability
- Maintainability
- Easy to update when API changes

### 3. Assertions

Custom assertion utilities:

```javascript
ApiAssertions.assertStatus(response.status, 200);
ApiAssertions.assertBody(response.body, expectedData);
ApiAssertions.validateSchema(response.body, petSchema);
```

### 4. Test Data Management

**Externalized Test Data:**
```javascript
const testData = require('../data/testData');
const pet = testData.pets.validPet;
```

**Dynamic Data Generation:**
```javascript
const petData = TestDataGenerator.generatePet({
  name: 'Custom Name',
  status: 'available'
});
```

## 📝 Best Practices

### Coding Standards

1. **Naming Conventions**
   - Test files: `*.api.test.js`
   - Service files: `*Service.js`
   - Utility files: `*.js` (camelCase)
   - Constants: UPPER_SNAKE_CASE

2. **Code Organization**
   - One test file per API resource
   - Group related tests using `test.describe()`
   - Use descriptive test names

3. **Reusability**
   - Extract common logic to utilities
   - Use service layer for API calls
   - Create helper functions for repeated operations

4. **Maintainability**
   - Keep tests independent
   - Clean up test data in `afterEach`
   - Use meaningful variable names
   - Add comments for complex logic

### Test Data Strategy

1. **Static Data** - For known test scenarios
2. **Dynamic Data** - For data-driven tests using Faker
3. **Parameterization** - Use test data files for multiple scenarios
4. **Cleanup** - Always clean up created test data

### Error Handling

- Use try-catch for expected errors
- Validate error responses
- Log errors appropriately
- Fail fast on unexpected errors

## 🔄 CI/CD Integration

### GitHub Actions

The framework includes a GitHub Actions workflow (`.github/workflows/api-tests.yml`) that:

- Runs tests on push and pull requests
- Tests against multiple Node.js versions
- Generates and uploads test reports
- Runs smoke tests separately

### Jenkins Integration

To integrate with Jenkins:

1. **Install Node.js plugin**
2. **Create a pipeline job**
3. **Use the following pipeline script:**

```groovy
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Generate Report') {
            steps {
                sh 'npm run test:report'
                publishHTML([
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'API Test Report'
                ])
            }
        }
    }
}
```

### Command to Run Tests

```bash
# Local execution
npm test

# CI/CD execution
npm ci && npm test
```

## 📈 Reporting

### Allure Reports

Generate and view Allure reports:

```bash
npm run test:report
```

**Features:**
- Test execution history
- Test results with screenshots
- Timeline view
- Categories and trends

### HTML Reports

Playwright generates HTML reports automatically:

```bash
npx playwright show-report
```

## 🧩 Example Test Cases

### GET Request Example

```javascript
test('Should retrieve pet by valid ID', async () => {
  // Given: A pet exists
  const petData = TestDataGenerator.generatePet();
  await petService.createPet(petData);
  
  // When: Retrieving the pet
  const response = await petService.getPetById(petData.id);
  
  // Then: Pet details should be returned
  ApiAssertions.assertStatus(response.status, 200);
  expect(response.body.name).toBe(petData.name);
});
```

### POST Request Example

```javascript
test('Should create a new pet', async () => {
  // Given: Valid pet data
  const petData = TestDataGenerator.generatePet();
  
  // When: Creating a new pet
  const response = await petService.createPet(petData);
  
  // Then: Pet should be created
  ApiAssertions.assertStatus(response.status, 200);
  ApiAssertions.validateSchema(response.body, petSchema);
});
```

### PUT Request Example

```javascript
test('Should update existing pet', async () => {
  // Given: An existing pet
  const petData = TestDataGenerator.generatePet();
  await petService.createPet(petData);
  
  // When: Updating the pet
  const updatedData = { ...petData, name: 'Updated Name' };
  const response = await petService.updatePet(updatedData);
  
  // Then: Pet should be updated
  ApiAssertions.assertStatus(response.status, 200);
  expect(response.body.name).toBe('Updated Name');
});
```

### DELETE Request Example

```javascript
test('Should delete existing pet', async () => {
  // Given: An existing pet
  const petData = TestDataGenerator.generatePet();
  await petService.createPet(petData);
  
  // When: Deleting the pet
  const response = await petService.deletePet(petData.id);
  
  // Then: Pet should be deleted
  ApiAssertions.assertStatus(response.status, 200);
  
  // And: Pet should not be retrievable
  const getResponse = await petService.getPetById(petData.id);
  ApiAssertions.assertStatus(getResponse.status, 404);
});
```

## 🔒 Security Testing

The framework includes basic security validations:

- SQL injection attempts
- XSS attempts
- Input length boundaries
- Header validation

## ⚡ Performance Testing

Lightweight performance checks:

- Response time validation
- Concurrent request handling
- Load tolerance testing

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Swagger Petstore API](https://petstore3.swagger.io/)
- [Allure Reporting](https://docs.qameta.io/allure/)
- [JSON Schema](https://json-schema.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Ensure all tests pass
6. Submit a pull request


## 👥 Authors
Aswanth Maroli
QA Automation Engineer

---

**Note:** This framework is designed for the Swagger Petstore API but can be easily adapted for any RESTful API by updating the configuration and service layers.
