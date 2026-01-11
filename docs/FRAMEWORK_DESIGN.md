# Framework Design Document

## 1. Requirement Analysis

### API Types
- **RESTful APIs** - Standard REST architecture
- **HTTP Methods** - GET, POST, PUT, DELETE
- **Content Type** - JSON (application/json)

### Authentication Methods
- **OAuth 2.0** - Bearer token support
- **API Key** - X-API-Key header support
- **Basic Auth** - Can be extended if needed

### Request/Response Formats
- **Request Body** - JSON format
- **Response Body** - JSON format
- **Headers** - Standard HTTP headers

### Error Handling and Status Codes
- **200 OK** - Successful GET, PUT requests
- **201 Created** - Successful POST requests
- **204 No Content** - Successful DELETE requests
- **400 Bad Request** - Invalid request data
- **401 Unauthorized** - Authentication required
- **403 Forbidden** - Access denied
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server errors

## 2. Test Strategy

### Scope of API Testing

#### Functional Testing
- CRUD operations (Create, Read, Update, Delete)
- Request/response validation
- Business logic validation

#### Status Code Validation
- Verify correct HTTP status codes
- Error code validation
- Success code validation

#### Schema Validation
- JSON schema validation
- Response structure validation
- Data type validation

#### Negative Testing
- Invalid input data
- Missing required fields
- Invalid data types
- Boundary value testing

#### Security Validation (Basic)
- SQL injection attempts
- XSS attempts
- Input length validation
- Header validation

#### Performance Checks (Lightweight)
- Response time validation
- Concurrent request handling
- Load tolerance

### In-Scope
- ✅ Functional API testing
- ✅ Status code validation
- ✅ Schema validation
- ✅ Negative testing
- ✅ Basic security checks
- ✅ Lightweight performance checks

### Out-of-Scope
- ❌ Load testing (use JMeter, K6)
- ❌ Penetration testing (use specialized tools)
- ❌ UI testing (separate framework)
- ❌ Database testing (separate framework)

### Test Data Strategy
1. **Static Test Data** - Predefined test data in `src/data/testData.js`
2. **Dynamic Test Data** - Generated using Faker library
3. **Parameterization** - Data-driven testing approach
4. **Test Data Cleanup** - Automatic cleanup in `afterEach` hooks

## 3. Framework Selection & Architecture

### Tech Stack
- **JavaScript (Node.js)** - Runtime environment
- **Playwright** - API testing framework
- **Axios** - HTTP client (via Playwright)
- **Ajv** - JSON schema validation
- **Faker** - Test data generation
- **Allure** - Test reporting
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Framework Components

#### 1. Configuration Layer
- Centralized configuration management
- Environment variable handling
- Endpoint definitions

#### 2. Client Layer
- Base HTTP client
- Authentication handling
- Request/response logging

#### 3. Service Layer (POM Equivalent)
- Encapsulates API operations
- Business logic abstraction
- Reusable API methods

#### 4. Test Layer
- Test cases organized by resource
- Given-When-Then format
- Test categorization

#### 5. Utility Layer
- Custom assertions
- Logging utilities
- Test data generators

#### 6. Schema Layer
- JSON schema definitions
- Response validation schemas

### Separation of Concerns

```
┌─────────────────┐
│   Test Layer    │  ← Test Cases
└────────┬────────┘
         │
┌────────▼────────┐
│  Service Layer  │  ← Business Logic
└────────┬────────┘
         │
┌────────▼────────┐
│  Client Layer   │  ← HTTP Communication
└────────┬────────┘
         │
┌────────▼────────┐
│  Config Layer   │  ← Configuration
└─────────────────┘
```

## 4. Project Structure

### Directory Purpose

- **src/config/** - Configuration files and environment settings
- **src/clients/** - Base HTTP client for API communication
- **src/services/** - Service layer (POM equivalent) for API operations
- **src/tests/** - Test cases organized by API resource
- **src/schemas/** - JSON schema definitions for validation
- **src/utils/** - Utility functions (logging, assertions, generators)
- **src/data/** - Externalized test data

## 5. Test Case Design

### Test Scenario Format

**Given-When-Then (Gherkin-style):**

```javascript
test('Should create a new pet', async () => {
  // Given: Valid pet data
  const petData = TestDataGenerator.generatePet();
  
  // When: Creating a new pet
  const response = await petService.createPet(petData);
  
  // Then: Pet should be created successfully
  ApiAssertions.assertStatus(response.status, 200);
  ApiAssertions.assertBody(response.body, petData);
});
```

### Test Coverage

#### Positive Cases
- Valid data scenarios
- Successful operations
- Expected responses

#### Negative Cases
- Invalid data
- Missing required fields
- Error scenarios
- Non-existent resources

#### Boundary Cases
- Maximum values
- Minimum values
- Edge cases
- Empty/null values

## 6. Automation Implementation

### Code Examples

#### Status Code Assertion
```javascript
ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
```

#### Response Body Assertion
```javascript
ApiAssertions.assertBody(response.body, expectedData);
```

#### Schema Validation
```javascript
ApiAssertions.validateSchema(response.body, petSchema);
```

#### Header Assertion
```javascript
ApiAssertions.assertHeader(response.headers, 'content-type', 'application/json');
```

## 7. Data Management

### Externalized Test Data
```javascript
const testData = require('../data/testData');
const pet = testData.pets.validPet;
```

### Dynamic Data Generation
```javascript
const petData = TestDataGenerator.generatePet({
  name: 'Custom Name',
  status: 'available'
});
```

### Parameterization Strategy
- Use test data files for multiple scenarios
- Generate dynamic data for unique test runs
- Handle IDs and tokens dynamically

## 8. Logging & Reporting

### Logging Strategy
- **DEBUG** - Detailed debugging information
- **INFO** - General information
- **WARN** - Warning messages
- **ERROR** - Error messages

### Reporting
- **Allure Reports** - Comprehensive test reports
- **HTML Reports** - Playwright HTML reports
- **Console Output** - Real-time test execution

## 9. CI/CD Integration

### GitHub Actions
- Automated test execution
- Multi-version Node.js testing
- Artifact uploads
- Report generation

### Jenkins Integration
- Pipeline configuration
- Test execution
- Report publishing

## 10. Best Practices

### Coding Standards
- ESLint for code quality
- Prettier for code formatting
- Consistent naming conventions

### Naming Conventions
- Test files: `*.api.test.js`
- Services: `*Service.js`
- Utilities: camelCase
- Constants: UPPER_SNAKE_CASE

### Reusability
- Service layer abstraction
- Utility functions
- Shared test data

### Maintainability
- Clear code structure
- Comprehensive comments
- Version control best practices

### Version Control Strategy
- Feature branches
- Pull request reviews
- Commit message conventions
- Tag releases

## 11. Sample Implementation

The framework includes complete test implementations for:

- **Pet API** - Full CRUD operations
- **Store API** - Inventory and orders
- **User API** - User management
- **Security Tests** - Basic security validations
- **Performance Tests** - Lightweight performance checks

All tests use the Swagger Petstore API as the target API.
