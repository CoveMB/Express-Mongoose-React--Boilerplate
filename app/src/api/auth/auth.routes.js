const express = require('express');
const { validateLoginRequest } = require('./middlewares');
const { isAuthenticated } = require('globalMiddlewares');
const controller = require('./auth.controller');

const authRouter = new express.Router();

authRouter
  .post('/login', validateLoginRequest, controller.logIn)
  .post('/logout', isAuthenticated, controller.logOut)
  .post('/logoutAll', isAuthenticated, controller.logOutAll);

module.exports = authRouter;
