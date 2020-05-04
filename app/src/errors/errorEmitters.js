const logger = require('config/logger');
const errorResponse = require('./errorResponse');
const EventEmitter = require('events');

// Construct an event emitter for errors
const errorEmitter = new EventEmitter();

const errorEvent = 'error';

errorEmitter.on(errorEvent, async (error, res = null) => {

  // Every error are logged
  logger.error(`${error.name} | ${error.message} | stack: ${error.stack}`);

  if (res) {

    errorResponse(error, res);

  }

});

module.exports = {
  errorEmitter, errorEvent
};
