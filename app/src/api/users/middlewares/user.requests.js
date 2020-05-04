const Joi = require('@hapi/joi');
const { ValidationError, errorEmitter, errorEvent } = require('errors');

// Define schema to validate request body
const createOneSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .required(),
  name: Joi
    .string()
    .required(),
  password: Joi
    .string()
    .required(),
  isAdmin: Joi
    .boolean()
});

// Validate the request body
const validateRequest = async ({ body }, res, next) => {

  try {

    await createOneSchema.validateAsync(body);

    next();

  } catch (error) {

    const validationError = new ValidationError(error.details[0].message);

    errorEmitter.emit(errorEvent, validationError, res);

  }

};

module.exports = { validateRequest };
