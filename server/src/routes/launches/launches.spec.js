const request = require('supertest');

const { mongoConnect, mongoDisconnect } = require('../../services/mongo');
const { app } = require('../../app');

describe('Launches API', () => {
	beforeAll(async () => {
		await mongoConnect();
	});

	afterAll(async () => {
		await mongoDisconnect();
	});

	describe('Test GET /launches', () => {
		test('it should respond with 200 success', async () => {
			await request(app)
				.get('/api/v1/launches')
				.expect('Content-Type', /json/)
				.expect(200);
		});
	});

	describe('Test POST /launch', () => {
		const completeLaunchData = {
			mission: 'USS Enterprise',
			rocket: 'NCC 1701-D',
			target: 'Kepler-62 f',
			launchDate: 'January 4, 2030',
		};

		const launchDataWithoutDate = {
			mission: 'USS Enterprise',
			rocket: 'NCC 1701-D',
			target: 'Kepler-62 f',
		};

		const launchDataWithInvalidDate = {
			mission: 'USS Enterprise',
			rocket: 'NCC 1701-D',
			target: 'Kepler-62 f',
			launchDate: 'zoot',
		};

		test('it should respond with 201 success', async () => {
			const response = await request(app)
				.post('/api/v1/launches')
				.send(completeLaunchData)
				.expect(201);

			const requestDate = new Date(completeLaunchData.launchDate).valueOf();
			const responseDate = new Date(
				response.body.data.newLaunch.launchDate
			).valueOf();

			expect(responseDate).toBe(requestDate);

			expect(response.body.data.newLaunch).toMatchObject(launchDataWithoutDate);
		});

		test('it should catch missing required properties', async () => {
			const response = await request(app)
				.post('/api/v1/launches')
				.send(launchDataWithoutDate)
				.expect(400);

			expect(response.body).toStrictEqual({ message: 'Invalid data' });
		});

		test('it should catch invalid dates', async () => {
			const response = await request(app)
				.post('/api/v1/launches')
				.send(launchDataWithInvalidDate)
				.expect(400);

			expect(response.body).toStrictEqual({ message: 'Invalid date' });
		});
	});
});
