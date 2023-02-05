const http = require('http');

require('dotenv').config();

const { mongoConnect } = require('./services/mongo');

const { loadPlanetsData } = require('./models/planet.model');
const { loadLaunchData } = require('./models/launch.model');
const { app } = require('./app');

const server = http.createServer(app);

async function startServer() {
	await mongoConnect();
	await loadPlanetsData();
	await loadLaunchData();

	const PORT = process.env.PORT || 8000;
	server.listen(PORT, () => {
		console.log(`Express API running on port: ${PORT}`);
	});
}

startServer();
