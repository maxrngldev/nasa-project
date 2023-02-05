const express = require('express');

// Controllers
const {
	httpGetAllLaunches,
	httpAbortLaunch,
	httpCreateLaunch,
} = require('./launches.controller');

// Middlewares
const { checkLoggedIn } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/', checkLoggedIn, httpGetAllLaunches);

router.post('/', httpCreateLaunch);

router.delete('/:id', httpAbortLaunch);

module.exports = { launchesRouter: router };
