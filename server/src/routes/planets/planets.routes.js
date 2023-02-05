const express = require('express');

// Controllers
const { httpGetAllPlanets } = require('./planets.controller');

const router = express.Router();

router.get('/', httpGetAllPlanets);

module.exports = { planetsRouter: router };
