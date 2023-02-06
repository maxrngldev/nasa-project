const BASE_URL = `/api/v1`;

async function httpGetPlanets() {
	const response = await fetch(`${BASE_URL}/planets`);

	// Load planets and return as JSON.
	const resData = await response.json();

	return resData.data.planets;
}

async function httpGetLaunches() {
	// TODO: Once API is ready.
	const response = await fetch(`${BASE_URL}/launches`);

	// Load launches, sort by flight number, and return as JSON.
	const resData = await response.json();

	return resData.data.launches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
	try {
		// Submit given launch data to launch system.
		const response = await fetch(`${BASE_URL}/launches`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(launch),
		});

		return await response.json();
	} catch (error) {
		return {
			data: { status: 'error' },
		};
	}
}

async function httpAbortLaunch(id) {
	try {
		const response = await fetch(`${BASE_URL}/launches/${id}`, {
			method: 'DELETE',
		});

		return await response.json();
	} catch (error) {
		return {
			data: { status: 'error' },
		};
	}
	// Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
