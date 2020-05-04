const { clientUrl } = require('config/variables');

exports.cors = (req, res, next) => {

  res.header('Access-Control-Allow-Origin', clientUrl);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

};
