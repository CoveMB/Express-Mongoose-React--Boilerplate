require('app-module-path').addPath(`${__dirname}/`);
require('./config/database');
const { appName, server } = require('./config/variables');
const logger = require('./config/logger');
const { app } = require('./config/server');

// Start the app
app.listen(server.port, () => {

  logger.info(`🛩  ${appName} is listening on port ${server.port}, let's play!`);

});
