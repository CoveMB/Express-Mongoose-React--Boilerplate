const User = require('models/User/User');
const { NotFoundError, errorEmitter, errorEvent } = require('errors');
const { sendWelcomeEmail, sendCancellationEmail } = require('emails/user.emails');

// The user the the parameter comes from the isAuthenticated middleware
exports.getProfile = async ({ userFromRequest }, res) => {

  res.send(userFromRequest);

};

// The id the the parameter comes from the isSelfOrAdmin middleware
exports.getOne = async ({ id }, res) => {

  try {

    // Get the user
    const user = await User.findById(id);

    if (!user) {

      // If no user is found throw a NotFoundError
      throw new NotFoundError('User');

    }

    // Send it
    res.send(user);

  } catch (error) {

    errorEmitter.emit(errorEvent, error, res);

  }

};

exports.getAll = async (req, res) => {

  try {

    // Get all the users
    const users = await User.find();

    res.send(users);

  } catch (error) {

    errorEmitter.emit(errorEvent, error, res);

  }

};

exports.createOne = async ({ body }, res) => {

  try {

    // Create new user
    const newUser = await new User(body).save();

    // Send welcome email
    sendWelcomeEmail(newUser.email, newUser.name);

    // And send it back
    res.status(201).send(newUser);

  } catch (error) {

    errorEmitter.emit(errorEvent, error, res);

  }

};

// The id the the parameter comes from the isSelfOrAdmin middleware
exports.updateOne = async ({ id, body }, res) => {

  try {

    // Find the appropriate user
    const user = await User.findById(id);

    if (!user) {

      // If no user is found return a 404
      throw new NotFoundError('User');

    }

    // Iterate through the user document to update it's fields
    Object.keys(body).forEach((updateField) => {

      user[updateField] = body[updateField];

      return false;

    });

    // Save the user
    await user.save();

    // And return it
    res.send(user);

  } catch (error) {

    errorEmitter.emit(errorEvent, error, res);

  }

};

// The id the the parameter comes from the isSelfOrAdmin middleware
exports.deleteOne = async ({ id }, res) => {

  try {

    // Find the user and delete it
    const user = await User.findByIdAndDelete(id);

    // Send cancellation email
    sendCancellationEmail(user.email, user.name);

    if (!user) {

      throw new NotFoundError('User');

    }

    res.send(user);

  } catch (error) {

    errorEmitter.emit(errorEvent, error, res);

  }

};
