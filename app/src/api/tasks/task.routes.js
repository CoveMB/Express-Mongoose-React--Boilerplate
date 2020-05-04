const express = require('express');
const { validateRequest } = require('./middlewares');
const { isAuthenticated } = require('globalMiddlewares');
const controller = require('./task.controller');

const taskRouter = new express.Router();

// The validateBody middleware validate the request body
taskRouter
  .post('/tasks', isAuthenticated, validateRequest, controller.createOne)
  .get('/tasks', isAuthenticated, controller.getAll)
  .get('/tasks/:id', isAuthenticated, controller.getOne)
  .patch('/tasks/:id', isAuthenticated, validateRequest, controller.updateOne)
  .delete('/tasks/:id', isAuthenticated, controller.deleteOne);

module.exports = taskRouter;
