/**
 * Pet API Test Suite
 * Tests for Pet endpoints covering CRUD operations
 * Includes positive, negative, and boundary test cases
 */

const { test, expect } = require('@playwright/test');
const PetService = require('../services/petService');
const ApiAssertions = require('../utils/assertions');
const TestDataGenerator = require('../utils/testDataGenerator');
const testData = require('../data/testData');
const { petSchema, petArraySchema, errorSchema } = require('../schemas/petSchema');
const config = require('../config/config');

test.describe('Pet API Tests', () => {
  let petService;
  let createdPetId;

  test.beforeEach(async () => {
    petService = new PetService();
  });

  test.afterEach(async () => {
    // Cleanup: Delete created pet if it exists
    if (createdPetId) {
      try {
        await petService.deletePet(createdPetId);
      } catch (error) {
        // Ignore cleanup errors
      }
    }
    await petService.dispose();
  });

  test.describe('POST /pet - Create Pet', () => {
    test('@smoke @positive Should create a new pet with valid data', async () => {
      // Given: Valid pet data
      const petData = TestDataGenerator.generatePet();

      // When: Creating a new pet
      const response = await petService.createPet(petData);

      // Then: Pet should be created successfully
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      ApiAssertions.assertBody(response.body, petData);
      ApiAssertions.validateSchema(response.body, petSchema);
      
      createdPetId = response.body.id;
    });

    test('@positive Should create pet with all required fields', async () => {
      // Given: Pet data with all required fields
      const petData = testData.pets.validPet;

      // When: Creating a new pet
      const response = await petService.createPet(petData);

      // Then: Pet should be created with correct data
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      expect(response.body.name).toBe(petData.name);
      expect(response.body.status).toBe(petData.status);
      ApiAssertions.assertFieldExists(response.body, 'id');
      ApiAssertions.assertFieldExists(response.body, 'name');
      
      createdPetId = response.body.id;
    });

    test('@negative Should handle invalid pet data', async () => {
      // Given: Invalid pet data with negative ID
      const invalidPetData = TestDataGenerator.generateInvalidData('pet');

      // When: Attempting to create pet with invalid data
      const response = await petService.createPet(invalidPetData);

      // Then: Should return error or handle gracefully
      // Note: Some APIs may accept invalid data but mark it as invalid
      // This test verifies the API's error handling
      expect([config.statusCodes.BAD_REQUEST, config.statusCodes.OK]).toContain(response.status);
    });

    test('@boundary Should create pet with maximum ID value', async () => {
      // Given: Pet data with maximum ID
      const petData = TestDataGenerator.generatePet({ id: 999999999 });

      // When: Creating a pet with maximum ID
      const response = await petService.createPet(petData);

      // Then: Pet should be created successfully
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      expect(response.body.id).toBe(petData.id);
      
      createdPetId = response.body.id;
    });
  });

  test.describe('GET /pet/{petId} - Get Pet by ID', () => {
    test('@smoke @positive Should retrieve pet by valid ID', async () => {
      // Given: A pet exists in the system
      const petData = TestDataGenerator.generatePet();
      const createResponse = await petService.createPet(petData);
      const petId = createResponse.body.id;
      createdPetId = petId;

      // When: Retrieving the pet by ID
      const response = await petService.getPetById(petId);

      // Then: Pet details should be returned
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      ApiAssertions.assertBody(response.body, petData);
      ApiAssertions.validateSchema(response.body, petSchema);
    });

    test('@negative Should return 404 for non-existent pet ID', async () => {
      // Given: A non-existent pet ID
      const nonExistentId = 999999999;

      // When: Attempting to retrieve pet with non-existent ID
      const response = await petService.getPetById(nonExistentId);

      // Then: Should return 404 Not Found
      ApiAssertions.assertStatus(response.status, config.statusCodes.NOT_FOUND);
      ApiAssertions.validateSchema(response.body, errorSchema);
    });

    test('@negative Should handle invalid pet ID format', async () => {
      // Given: Invalid pet ID (string instead of number)
      const invalidId = 'invalid_id';

      // When: Attempting to retrieve pet with invalid ID
      const response = await petService.getPetById(invalidId);

      // Then: Should return error status
      expect([config.statusCodes.BAD_REQUEST, config.statusCodes.NOT_FOUND]).toContain(
        response.status
      );
    });

    test('@boundary Should handle zero as pet ID', async () => {
      // Given: Pet ID as zero
      const zeroId = 0;

      // When: Attempting to retrieve pet with zero ID
      const response = await petService.getPetById(zeroId);

      // Then: Should return error (zero is typically invalid)
      expect([config.statusCodes.BAD_REQUEST, config.statusCodes.NOT_FOUND]).toContain(
        response.status
      );
    });
  });

  test.describe('PUT /pet - Update Pet', () => {
    test('@positive Should update existing pet', async () => {
      // Given: An existing pet
      const petData = TestDataGenerator.generatePet();
      const createResponse = await petService.createPet(petData);
      const petId = createResponse.body.id;
      createdPetId = petId;

      // And: Updated pet data
      const updatedPetData = {
        ...petData,
        name: 'Updated Pet Name',
        status: 'sold',
      };

      // When: Updating the pet
      const response = await petService.updatePet(updatedPetData);

      // Then: Pet should be updated successfully
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      expect(response.body.name).toBe(updatedPetData.name);
      expect(response.body.status).toBe(updatedPetData.status);
      ApiAssertions.validateSchema(response.body, petSchema);
    });

    test('@negative Should handle update with invalid data', async () => {
      // Given: An existing pet
      const petData = TestDataGenerator.generatePet();
      const createResponse = await petService.createPet(petData);
      const petId = createResponse.body.id;
      createdPetId = petId;

      // And: Invalid update data
      const invalidUpdate = {
        id: petId,
        name: '',
        status: 'invalid_status',
      };

      // When: Attempting to update with invalid data
      const response = await petService.updatePet(invalidUpdate);

      // Then: Should return error or handle gracefully
      expect([config.statusCodes.BAD_REQUEST, config.statusCodes.OK]).toContain(response.status);
    });
  });

  test.describe('DELETE /pet/{petId} - Delete Pet', () => {
    test('@positive Should delete existing pet', async () => {
      // Given: An existing pet
      const petData = TestDataGenerator.generatePet();
      const createResponse = await petService.createPet(petData);
      const petId = createResponse.body.id;
      createdPetId = petId;

      // When: Deleting the pet
      const response = await petService.deletePet(petId);

      // Then: Pet should be deleted successfully
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      
      // And: Pet should not be retrievable
      const getResponse = await petService.getPetById(petId);
      ApiAssertions.assertStatus(getResponse.status, config.statusCodes.NOT_FOUND);
      
      createdPetId = null; // Already deleted
    });

    test('@negative Should return 404 when deleting non-existent pet', async () => {
      // Given: A non-existent pet ID
      const nonExistentId = 999999999;

      // When: Attempting to delete non-existent pet
      const response = await petService.deletePet(nonExistentId);

      // Then: Should return 404 Not Found
      ApiAssertions.assertStatus(response.status, config.statusCodes.NOT_FOUND);
    });
  });

  test.describe('GET /pet/findByStatus - Find Pets by Status', () => {
    test('@positive Should find pets by available status', async () => {
      // Given: Pets with available status exist
      const petData = TestDataGenerator.generatePet({ status: 'available' });
      const createResponse = await petService.createPet(petData);
      createdPetId = createResponse.body.id;

      // When: Finding pets by available status
      const response = await petService.findPetsByStatus('available');

      // Then: Should return array of available pets
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      ApiAssertions.assertIsArray(response.body);
      ApiAssertions.validateSchema(response.body, petArraySchema);
      
      // And: All returned pets should have available status
      if (response.body.length > 0) {
        response.body.forEach((pet) => {
          expect(pet.status).toBe('available');
        });
      }
    });

    test('@positive Should find pets by sold status', async () => {
      // When: Finding pets by sold status
      const response = await petService.findPetsByStatus('sold');

      // Then: Should return array of sold pets
      ApiAssertions.assertStatus(response.status, config.statusCodes.OK);
      ApiAssertions.assertIsArray(response.body);
      
      // And: All returned pets should have sold status
      if (response.body.length > 0) {
        response.body.forEach((pet) => {
          expect(pet.status).toBe('sold');
        });
      }
    });

    test('@negative Should handle invalid status value', async () => {
      // Given: Invalid status value
      const invalidStatus = 'invalid_status';

      // When: Finding pets with invalid status
      const response = await petService.findPetsByStatus(invalidStatus);

      // Then: Should return error or empty array
      expect([config.statusCodes.BAD_REQUEST, config.statusCodes.OK]).toContain(response.status);
    });

    test('@boundary Should handle empty status parameter', async () => {
      // Given: Empty status parameter
      const emptyStatus = '';

      // When: Finding pets with empty status
      const response = await petService.findPetsByStatus(emptyStatus);

      // Then: Should return error or handle gracefully
      expect([config.statusCodes.BAD_REQUEST, config.statusCodes.OK]).toContain(response.status);
    });
  });
});
