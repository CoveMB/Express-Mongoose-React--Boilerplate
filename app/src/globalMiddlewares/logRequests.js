const logger = require('config/logger');

exports.logRequests = (req, res, next) => {

  logger.info(`${req.method} | ${req.path}`);

  next();

};
