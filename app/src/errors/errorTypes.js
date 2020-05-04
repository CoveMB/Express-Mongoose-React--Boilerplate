class ValidationError extends Error {

  constructor(message) {

    super(`The validation failed: ${message}`);
    this.name = 'ValidationError';

  }

}

class NotFoundError extends Error {

  constructor(message) {

    super(`Not found: ${message}`);
    this.name = 'NotFoundError';

  }

}

class LoginError extends Error {

  constructor() {

    super('Unable to login');
    this.name = 'LoginError';

  }

}

class NotAuthenticatedError extends Error {

  constructor() {

    super('You need to be authenticated to perform this action');
    this.name = 'NotAuthenticatedError';

  }

}

class NotAuthorizeError extends Error {

  constructor() {

    super('You are not authorize to perform this action');
    this.name = 'NotAuthorizeError';

  }

}

class EmailNotSentError extends Error {

  constructor(message) {

    super(`Email could not been sent: ${message}`);
    this.name = 'EmailNotSentError';

  }

}

module.exports = {
  ValidationError,
  NotFoundError,
  LoginError,
  NotAuthenticatedError,
  NotAuthorizeError,
  EmailNotSentError
};
