/**
 * Pet Service - Service layer for Pet API endpoints
 * Implements Page Object Model pattern for APIs
 * Encapsulates all Pet-related API operations
 */

const ApiClient = require('../clients/apiClient');
const config = require('../config/config');
const logger = require('../utils/logger');

class PetService {
  constructor() {
    this.apiClient = new ApiClient();
    this.endpoints = config.endpoints;
  }

  /**
   * Create a new pet
   * @param {Object} petData - Pet data object
   * @returns {Promise<Object>} API response
   */
  async createPet(petData) {
    logger.info(`Creating pet with name: ${petData.name}`);
    const response = await this.apiClient.post(this.endpoints.pet, petData);
    return response;
  }

  /**
   * Get pet by ID
   * @param {number} petId - Pet ID
   * @returns {Promise<Object>} API response
   */
  async getPetById(petId) {
    logger.info(`Getting pet with ID: ${petId}`);
    const response = await this.apiClient.get(this.endpoints.petById(petId));
    return response;
  }

  /**
   * Update an existing pet
   * @param {Object} petData - Updated pet data
   * @returns {Promise<Object>} API response
   */
  async updatePet(petData) {
    logger.info(`Updating pet with ID: ${petData.id}`);
    const response = await this.apiClient.put(this.endpoints.pet, petData);
    return response;
  }

  /**
   * Delete a pet
   * @param {number} petId - Pet ID
   * @returns {Promise<Object>} API response
   */
  async deletePet(petId) {
    logger.info(`Deleting pet with ID: ${petId}`);
    const response = await this.apiClient.delete(this.endpoints.petById(petId));
    return response;
  }

  /**
   * Find pets by status
   * @param {string} status - Pet status (available, pending, sold)
   * @returns {Promise<Object>} API response
   */
  async findPetsByStatus(status) {
    logger.info(`Finding pets with status: ${status}`);
    const response = await this.apiClient.get(this.endpoints.petByStatus(status));
    return response;
  }

  /**
   * Find pets by tags
   * @param {Array<string>} tags - Array of tag names
   * @returns {Promise<Object>} API response
   */
  async findPetsByTags(tags) {
    const tagsQuery = Array.isArray(tags) ? tags.join(',') : tags;
    logger.info(`Finding pets with tags: ${tagsQuery}`);
    const response = await this.apiClient.get(this.endpoints.petByTags(tagsQuery));
    return response;
  }

  /**
   * Update pet status (form data)
   * @param {number} petId - Pet ID
   * @param {string} status - New status
   * @returns {Promise<Object>} API response
   */
  async updatePetStatus(petId, status) {
    logger.info(`Updating pet ${petId} status to: ${status}`);
    // Note: This endpoint uses form data, which would require special handling
    // For now, we'll use the PUT endpoint to update the entire pet
    const pet = await this.getPetById(petId);
    if (pet.status === 200) {
      pet.body.status = status;
      return await this.updatePet(pet.body);
    }
    return pet;
  }

  /**
   * Clean up resources
   */
  async dispose() {
    await this.apiClient.dispose();
  }
}

module.exports = PetService;
