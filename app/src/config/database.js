const mongoose = require('mongoose');
const logger = require('./logger');
const {
  dbHost, dbPort, dbUser, dbPassword
} = require('./variables');

const connectionUrl = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}`;

(async () => {

  try {

    await mongoose.connect(connectionUrl, {
      useNewUrlParser   : true,
      useCreateIndex    : true,
      useUnifiedTopology: true,
      useFindAndModify  : false
    });

  } catch (e) {

    logger.error('Could not connect to the db: ', e);

  }

})();
