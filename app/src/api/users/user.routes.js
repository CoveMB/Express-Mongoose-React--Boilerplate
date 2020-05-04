const express = require('express');
const controller = require('./user.controller');
const { isAuthenticated } = require('globalMiddlewares');
const { validateRequest, isSelfOrAdmin } = require('./middlewares');


const userRouter = new express.Router();

// The validateBody middleware validate the request body
userRouter
  .post('/users',
    validateRequest,
    controller.createOne)
  .get('/users',
    isAuthenticated,
    isSelfOrAdmin,
    controller.getAll)
  .get('/users/profile',
    isAuthenticated,
    controller.getProfile)
  .get('/users/:id',
    isAuthenticated,
    isSelfOrAdmin,
    controller.getOne)
  .patch('/users/:id',
    validateRequest,
    isAuthenticated,
    isSelfOrAdmin,
    controller.updateOne)
  .delete('/users/:id',
    isAuthenticated,
    isSelfOrAdmin,
    controller.deleteOne);

module.exports = userRouter;
