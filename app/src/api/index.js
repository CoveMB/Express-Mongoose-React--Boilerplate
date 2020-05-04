const express = require('express');
const fs = require('fs');
const path = require('path');

const baseName = path.basename(__filename);

const Router = new express.Router();

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== baseName)
  .forEach((file) => {

    const router = require(path.join(__dirname, file)); // eslint-disable-line

    Router.use(router);


  });

module.exports = Router;
