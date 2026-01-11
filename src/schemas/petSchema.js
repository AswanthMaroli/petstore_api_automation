/**
 * JSON Schema definitions for Pet API
 * Used for response validation
 */

const petSchema = {
  type: 'object',
  required: ['id', 'name'],
  properties: {
    id: {
      type: 'integer',
      minimum: 1,
    },
    name: {
      type: 'string',
      minLength: 1,
    },
    category: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
      },
    },
    photoUrls: {
      type: 'array',
      items: { type: 'string' },
    },
    tags: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
        },
      },
    },
    status: {
      type: 'string',
      enum: ['available', 'pending', 'sold'],
    },
  },
};

const petArraySchema = {
  type: 'array',
  items: petSchema,
};

const errorSchema = {
  type: 'object',
  required: ['code', 'type', 'message'],
  properties: {
    code: { type: 'integer' },
    type: { type: 'string' },
    message: { type: 'string' },
  },
};

module.exports = {
  petSchema,
  petArraySchema,
  errorSchema,
};
