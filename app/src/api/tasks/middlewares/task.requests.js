const Joi = require('@hapi/joi');
const { ValidationError, errorEmitter, errorEvent } = require('errors');

const createOneSchema = Joi.object({
  description: Joi.string(),
  completed  : Joi.boolean()
});

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
