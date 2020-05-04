const logger = require('config/logger');

const handleHTTPErrors = (error, res) => {

  switch (error.name) {

    case 'ValidationError':

      // This error is generated when a validation have failed
      res.status(422).send(error.message);
      break;

    case 'NotFoundError':

      // This error is generated when a record is nopt found in the db
      res.status(400).send(error.message);
      break;

    case 'LoginError':

      // This error is generated when a login failed
      res.status(401).send(error.message);
      break;

    case 'NotAuthenticatedError':

      // This error is generated when the user is performing an action that require authentication but he/she is not
      res.status(401).send(error.message);
      break;

    case 'NotAuthorizeError':

      // This error is generated when the user is performing an unauthorized action
      res.status(403).send(error.message);
      break;

    default:

      // Otherwise send a server error
      res.status(500).send();
      break;

  }

};

module.exports = handleHTTPErrors;
