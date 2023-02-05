const express = require('express');

const { planetsRouter } = require('./planets/planets.routes');
const { launchesRouter } = require('./launches/launches.routes');
const { authRouter } = require('./auth/auth.routes');

const api = express.Router();

api.use('/planets', planetsRouter);
api.use('/launches', launchesRouter);
api.use('/auth', authRouter);

module.exports = { api };
