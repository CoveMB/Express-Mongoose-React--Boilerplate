const errorEmitters = require('./errorEmitters');
const errorTypes = require('./errorTypes');

const allErrorUtilities = {
  ...errorEmitters,
  ...errorTypes
};

module.exports = allErrorUtilities;
