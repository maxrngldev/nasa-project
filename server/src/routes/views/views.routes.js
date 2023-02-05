const express = require('express');

// Controllers
const { getIndex } = require('./views.controller');

const router = express.Router();

router.get('/*', getIndex);

module.exports = { viewsRouter: router };
