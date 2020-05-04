const jwt = require('jsonwebtoken');
const User = require('models/User/User');
const { NotAuthenticatedError, errorEmitter, errorEvent } = require('errors');
const { jwtSecret } = require('config/variables');

exports.isAuthenticated = async (req, res, next) => {

  try {


    // Get the bearer token
    const token = req.header('Authorization').replace('Bearer ', '');

    // Make sure it's valid and get the user id from it
    const decoded = await jwt.verify(token, jwtSecret);


    // Find the appropriate user
    const user = await User.findOne({
      _id: decoded.id, 'tokens.token': token
    });

    if (!user) {

      // If no user is found throw a NotAuthenticatedError user
      throw new NotAuthenticatedError();

    }

    // Attach the found user and current token to the response
    req.userFromRequest = user;
    req.token = token;

    next();

  } catch {

    errorEmitter.emit(errorEvent, new NotAuthenticatedError(), res);

  }

};
