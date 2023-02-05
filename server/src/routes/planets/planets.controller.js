const { getAllPlanets } = require('../../models/planet.model');

async function httpGetAllPlanets(req, res) {
	const planets = await getAllPlanets();

	return res.status(200).json({
		status: 'success',
		data: { planets },
	});
}

module.exports = { httpGetAllPlanets };
