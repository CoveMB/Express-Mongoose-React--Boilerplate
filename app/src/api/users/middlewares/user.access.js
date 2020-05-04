const { NotAuthorizeError, errorEmitter, errorEvent } = require('errors');

const isSelfOrAdmin = async (req, res, next) => {

  try {

    const { userFromRequest, params } = req;
    const { id } = params;

    console.log(userFromRequest.isAdmin);

    if (userFromRequest.id === id || userFromRequest.isAdmin) {

      req.id = id;

      next();

    } else {

      throw new NotAuthorizeError();

    }

  } catch {

    errorEmitter.emit(errorEvent, new NotAuthorizeError());

  }

};

module.exports = { isSelfOrAdmin };
