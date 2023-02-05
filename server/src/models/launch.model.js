const axios = require('axios');

const { Launches } = require('./launches.mongo');
const { Planets } = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = `https://api.spacexdata.com/v4/launches/query`;

async function populateLaunches() {
	const response = await axios.post(SPACEX_API_URL, {
		query: {},
		options: {
			pagination: false,
			populate: [
				{
					path: 'rocket',
					select: {
						name: 1,
					},
				},
				{
					path: 'payloads',
					select: {
						customers: 1,
					},
				},
			],
		},
	});

	if (response.status !== 200) {
		throw new Error('Launch data download failed!');
	}

	const launchDocs = response.data.docs;

	for (const launchDoc of launchDocs) {
		const payloads = launchDoc['payloads'];
		const customers = payloads.flatMap(payload => payload['customers']);

		const launch = {
			flightNumber: launchDoc['flight_number'],
			mission: launchDoc['name'],
			rocket: launchDoc['rocket']['name'],
			launchDate: launchDoc['date_local'],
			upcoming: launchDoc['upcoming'],
			success: launchDoc['success'],
			customers: customers,
		};

		await saveLaunch(launch);
	}
}

async function loadLaunchData() {
	const firstLaunch = await findLaunch({
		flightNumber: 1,
		rocket: 'Falcon 1',
		mission: 'FalconSat',
	});

	if (firstLaunch) {
		console.log('Launch data already populated');
		return;
	}

	await populateLaunches();
}

async function findLaunch(filter) {
	return await Launches.findOne(filter);
}

async function getAllLaunches(skip, limit) {
	return await Launches.find({}, { _id: 0, __v: 0 })
		.sort({ flightNumber: 1 })
		.skip(skip)
		.limit(limit);
}

async function getLatestFlightNumber() {
	const latestLaunch = await Launches.findOne().sort('-flightNumber');

	if (!latestLaunch) {
		return DEFAULT_FLIGHT_NUMBER;
	}

	return latestLaunch.flightNumber;
}

async function scheduleNewLaunch(launch) {
	const planet = await Planets.findOne({ keplerName: launch.target });

	if (!planet) {
		throw new Error('No matching planet found.');
	}

	const newFlightNumber = (await getLatestFlightNumber()) + 1;

	const newLaunch = Object.assign(launch, {
		success: true,
		upcoming: true,
		customers: ['Zero to Mastery', 'NASA'],
		flightNumber: newFlightNumber,
	});

	await saveLaunch(newLaunch);
}

async function saveLaunch(newLaunch) {
	await Launches.findOneAndUpdate(
		{ flightNumber: newLaunch.flightNumber },
		{ ...newLaunch },
		{ upsert: true }
	);
}

async function existsLaunchById(id) {
	return await findLaunch({ flightNumber: id });
}

async function abortLaunchById(id) {
	const aborted = await Launches.updateOne(
		{ flightNumber: id },
		{ upcoming: false, success: false }
	);

	return aborted.modifiedCount === 1;
}

module.exports = {
	loadLaunchData,
	getAllLaunches,
	scheduleNewLaunch,
	existsLaunchById,
	abortLaunchById,
};
