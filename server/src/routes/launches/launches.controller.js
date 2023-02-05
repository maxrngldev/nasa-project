const {
	getAllLaunches,
	scheduleNewLaunch,
	existsLaunchById,
	abortLaunchById,
} = require('../../models/launch.model');

const { getPagination } = require('../../services/query');

async function httpGetAllLaunches(req, res) {
	const { skip, limit } = getPagination(req.query);

	const launches = await getAllLaunches(skip, limit);

	res.status(200).json({
		status: 'success',
		data: {
			launches,
		},
	});
}

async function httpCreateLaunch(req, res) {
	const { mission, rocket, target, launchDate } = req.body;

	if (!mission || !rocket || !target || !launchDate) {
		return res.status(400).json({ message: 'Invalid data' });
	}

	if (isNaN(new Date(launchDate))) {
		return res.status(400).json({ message: 'Invalid date' });
	}

	const newLaunch = {
		mission,
		rocket,
		target,
		launchDate: new Date(launchDate),
	};

	await scheduleNewLaunch(newLaunch);

	res.status(201).json({
		status: 'success',
		data: { newLaunch },
	});
}

async function httpAbortLaunch(req, res) {
	const { id } = req.params;

	const launchExists = await existsLaunchById(+id);

	if (!launchExists) {
		return res.status(404).json({ message: 'Not found' });
	}

	const aborted = await abortLaunchById(+id);

	if (!aborted) {
		return res.status(400).json({
			status: 'error',
			message: 'Launch not aborted',
		});
	}

	return res.status(200).json({
		status: 'success',
	});
}

module.exports = { httpGetAllLaunches, httpCreateLaunch, httpAbortLaunch };
