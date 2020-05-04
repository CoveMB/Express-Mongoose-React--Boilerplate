const Joi = require('@hapi/joi');
const { ValidationError, errorEmitter, errorEvent } = require('errors');

const loginSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .required(),
  password: Joi
    .string()
    .required()
});

const validateLoginRequest = async ({ body }, res, next) => {

  try {

    await loginSchema.validateAsync(body);

    next();

  } catch (error) {

    const validationError = new ValidationError(error.details[0].message);

    errorEmitter.emit(errorEvent, validationError, res);

  }


};

module.exports = { validateLoginRequest };
