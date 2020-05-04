
const User = require('models/User/User');
const { errorEvent, errorEmitter } = require('errors');

exports.logIn = async ({ body }, res) => {

  try {

    // Find the user from the send credentials
    const user = await User.findByCredentials(body);

    // Generate JWT token
    const token = await user.generateAuthToken();

    // Send back the token
    res.send({
      user, token
    });

  } catch (error) {

    errorEmitter.emit(errorEvent, error, res);

  }

};

// The user the the parameter comes back from the isAuthenticated middleware
exports.logOut = async ({ userFromRequest, token }, res) => {

  try {

    userFromRequest.revokeAuthToken(token);

    res.send();

  } catch (error) {

    errorEmitter.emit(errorEvent, error, res);

  }

};

// The user the the parameter comes back from the isAuthenticated middleware
exports.logOutAll = async ({ userFromRequest }, res) => {

  try {

    userFromRequest.revokeAllAuthTokens();

    res.send();

  } catch (error) {

    errorEmitter.emit(errorEvent, error, res);

  }

};
