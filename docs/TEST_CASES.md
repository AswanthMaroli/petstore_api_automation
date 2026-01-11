# Test Cases Documentation

## Test Case Design

This document outlines the test cases implemented in the framework, following the Given-When-Then format.

## Pet API Test Cases

### POST /pet - Create Pet

#### TC_PET_001: Create Pet with Valid Data
- **Type:** @smoke @positive
- **Given:** Valid pet data with all required fields
- **When:** Creating a new pet via POST /pet
- **Then:** 
  - Status code should be 200
  - Response body should match request data
  - Schema validation should pass

#### TC_PET_002: Create Pet with All Required Fields
- **Type:** @positive
- **Given:** Pet data with all required fields (id, name)
- **When:** Creating a new pet
- **Then:**
  - Pet should be created successfully
  - Response should contain pet ID and name

#### TC_PET_003: Create Pet with Invalid Data
- **Type:** @negative
- **Given:** Invalid pet data (negative ID, empty name)
- **When:** Attempting to create pet
- **Then:** Should return error or handle gracefully

#### TC_PET_004: Create Pet with Maximum ID
- **Type:** @boundary
- **Given:** Pet data with maximum ID value
- **When:** Creating a pet
- **Then:** Pet should be created successfully

### GET /pet/{petId} - Get Pet by ID

#### TC_PET_005: Get Pet by Valid ID
- **Type:** @smoke @positive
- **Given:** A pet exists in the system
- **When:** Retrieving pet by ID
- **Then:**
  - Status code should be 200
  - Pet details should be returned
  - Schema validation should pass

#### TC_PET_006: Get Pet with Non-Existent ID
- **Type:** @negative
- **Given:** A non-existent pet ID
- **When:** Attempting to retrieve pet
- **Then:** Should return 404 Not Found

#### TC_PET_007: Get Pet with Invalid ID Format
- **Type:** @negative
- **Given:** Invalid pet ID (string instead of number)
- **When:** Attempting to retrieve pet
- **Then:** Should return error status

#### TC_PET_008: Get Pet with Zero ID
- **Type:** @boundary
- **Given:** Pet ID as zero
- **When:** Attempting to retrieve pet
- **Then:** Should return error

### PUT /pet - Update Pet

#### TC_PET_009: Update Existing Pet
- **Type:** @positive
- **Given:** An existing pet
- **When:** Updating pet data
- **Then:**
  - Status code should be 200
  - Pet should be updated with new data
  - Schema validation should pass

#### TC_PET_010: Update Pet with Invalid Data
- **Type:** @negative
- **Given:** An existing pet and invalid update data
- **When:** Attempting to update pet
- **Then:** Should return error or handle gracefully

### DELETE /pet/{petId} - Delete Pet

#### TC_PET_011: Delete Existing Pet
- **Type:** @positive
- **Given:** An existing pet
- **When:** Deleting the pet
- **Then:**
  - Status code should be 200
  - Pet should be deleted
  - Pet should not be retrievable

#### TC_PET_012: Delete Non-Existent Pet
- **Type:** @negative
- **Given:** A non-existent pet ID
- **When:** Attempting to delete pet
- **Then:** Should return 404 Not Found

### GET /pet/findByStatus - Find Pets by Status

#### TC_PET_013: Find Pets by Available Status
- **Type:** @positive
- **Given:** Pets with available status exist
- **When:** Finding pets by available status
- **Then:**
  - Status code should be 200
  - Should return array of pets
  - All pets should have available status

#### TC_PET_014: Find Pets by Sold Status
- **Type:** @positive
- **Given:** Pets with sold status exist
- **When:** Finding pets by sold status
- **Then:**
  - Should return array of sold pets
  - All pets should have sold status

#### TC_PET_015: Find Pets with Invalid Status
- **Type:** @negative
- **Given:** Invalid status value
- **When:** Finding pets with invalid status
- **Then:** Should return error or empty array

#### TC_PET_016: Find Pets with Empty Status
- **Type:** @boundary
- **Given:** Empty status parameter
- **When:** Finding pets
- **Then:** Should return error or handle gracefully

## Store API Test Cases

### GET /store/inventory - Get Inventory

#### TC_STORE_001: Get Store Inventory
- **Type:** @smoke @positive
- **Given:** Store inventory endpoint is available
- **When:** Retrieving store inventory
- **Then:**
  - Status code should be 200
  - Inventory data should be returned

### POST /store/order - Place Order

#### TC_STORE_002: Place Order with Valid Data
- **Type:** @positive
- **Given:** Valid order data
- **When:** Placing a new order
- **Then:**
  - Status code should be 200
  - Order should be created
  - Response should contain order details

#### TC_STORE_003: Place Order with Invalid Data
- **Type:** @negative
- **Given:** Invalid order data
- **When:** Attempting to place order
- **Then:** Should return error

#### TC_STORE_004: Place Order with Maximum Quantity
- **Type:** @boundary
- **Given:** Order with maximum quantity
- **When:** Placing order
- **Then:** Order should be placed successfully

### GET /store/order/{orderId} - Get Order by ID

#### TC_STORE_005: Get Order by Valid ID
- **Type:** @positive
- **Given:** An existing order
- **When:** Retrieving order by ID
- **Then:**
  - Status code should be 200
  - Order details should be returned

#### TC_STORE_006: Get Order with Non-Existent ID
- **Type:** @negative
- **Given:** A non-existent order ID
- **When:** Attempting to retrieve order
- **Then:** Should return 404 Not Found

### DELETE /store/order/{orderId} - Delete Order

#### TC_STORE_007: Delete Existing Order
- **Type:** @positive
- **Given:** An existing order
- **When:** Deleting the order
- **Then:**
  - Status code should be 200
  - Order should be deleted
  - Order should not be retrievable

#### TC_STORE_008: Delete Non-Existent Order
- **Type:** @negative
- **Given:** A non-existent order ID
- **When:** Attempting to delete order
- **Then:** Should return 404 Not Found

## User API Test Cases

### POST /user - Create User

#### TC_USER_001: Create User with Valid Data
- **Type:** @positive
- **Given:** Valid user data
- **When:** Creating a new user
- **Then:**
  - Status code should be 200
  - User should be created

#### TC_USER_002: Create User with Invalid Data
- **Type:** @negative
- **Given:** Invalid user data
- **When:** Attempting to create user
- **Then:** Should return error or handle gracefully

### GET /user/{username} - Get User by Username

#### TC_USER_003: Get User by Valid Username
- **Type:** @positive
- **Given:** An existing user
- **When:** Retrieving user by username
- **Then:**
  - Status code should be 200
  - User details should be returned

#### TC_USER_004: Get User with Non-Existent Username
- **Type:** @negative
- **Given:** A non-existent username
- **When:** Attempting to retrieve user
- **Then:** Should return 404 Not Found

### PUT /user/{username} - Update User

#### TC_USER_005: Update Existing User
- **Type:** @positive
- **Given:** An existing user
- **When:** Updating user data
- **Then:**
  - Status code should be 200
  - User should be updated

### DELETE /user/{username} - Delete User

#### TC_USER_006: Delete Existing User
- **Type:** @positive
- **Given:** An existing user
- **When:** Deleting the user
- **Then:**
  - Status code should be 200
  - User should be deleted
  - User should not be retrievable

### GET /user/login - User Login

#### TC_USER_007: Login with Valid Credentials
- **Type:** @positive
- **Given:** An existing user
- **When:** Logging in with valid credentials
- **Then:** Login should be successful

#### TC_USER_008: Login with Invalid Credentials
- **Type:** @negative
- **Given:** Invalid credentials
- **When:** Attempting to login
- **Then:** Should return error

### GET /user/logout - User Logout

#### TC_USER_009: Logout Successfully
- **Type:** @positive
- **Given:** User is logged in
- **When:** Logging out
- **Then:** Logout should be successful

## Security Test Cases

### TC_SEC_001: Validate Content-Type Header
- **Type:** @security
- **Given:** API endpoint
- **When:** Making a request
- **Then:** Response should have proper Content-Type header

### TC_SEC_002: Handle SQL Injection Attempts
- **Type:** @security
- **Given:** SQL injection attempt in parameters
- **When:** Making request with SQL injection
- **Then:** Should handle gracefully without executing SQL

### TC_SEC_003: Handle XSS Attempts
- **Type:** @security
- **Given:** XSS attempt in request data
- **When:** Making request with XSS payload
- **Then:** Should sanitize or reject malicious input

### TC_SEC_004: Validate Input Length Boundaries
- **Type:** @security
- **Given:** Extremely long string input
- **When:** Making request with oversized input
- **Then:** Should handle or reject oversized input

## Performance Test Cases

### TC_PERF_001: Response Time Validation
- **Type:** @performance
- **Given:** API endpoint
- **When:** Making a GET request
- **Then:** Response should be received within acceptable time

### TC_PERF_002: Concurrent Request Handling
- **Type:** @performance
- **Given:** Multiple concurrent requests
- **When:** Executing concurrent requests
- **Then:** All requests should complete successfully

### TC_PERF_003: Load Tolerance
- **Type:** @performance
- **Given:** Multiple sequential requests
- **When:** Making multiple requests
- **Then:** Average response time should be acceptable
