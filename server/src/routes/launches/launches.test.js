const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
const { loadPlanetsData } = require("../../models/planetsModel");
const { loadLaunchData } = require("../../models/launchesModel");

describe("Launches API", () => {
	beforeAll(async () => {
		await mongoConnect();
		await loadPlanetsData();
		await loadLaunchData();
	});

	afterAll(async () => {
		await mongoDisconnect();
	});

	describe("Test GET /launches", () => {
		test("It should respond with 200 success", async () => {
			const response = await request(app)
				.get("/v1/launches")
				.expect("Content-Type", /json/)
				.expect(200);
		});
	});

	describe("Test POST /launch", () => {
		const completeLaunchData = {
			mission: "USS Enterprise",
			rocket: "NCC 1701-D",
			target: "Kepler-62 f",
			launchDate: "January 4, 2028"
		};

		const launchDataWithoutDate = {
			mission: "USS Enterprise",
			rocket: "NCC 1701-D",
			target: "Kepler-62 f"
		};

		const launchDataWithInvalidDate = {
			mission: "USS Enterprise",
			rocket: "NCC 1701-D",
			target: "Kepler-62 f",
			launchDate: "zoot"
		};

		test("It should respond with 201 created", async () => {
			const response = await request(app)
				.post("/v1/launches")
				.send(completeLaunchData)
				.expect("Content-Type", /json/)
				.expect(201);

			const requestDate = new Date(
				completeLaunchData.launchDate
			).valueOf();
			const responseDate = new Date(response.body.launchDate).valueOf();
			await expect(responseDate).toBe(requestDate);

			await expect(response.body).toMatchObject(launchDataWithoutDate);
		});

		test("It should catch missing required properties", async () => {
			const response = await request(app)
				.post("/v1/launches")
				.send(launchDataWithoutDate)
				.expect("Content-Type", /json/)
				.expect(400);

			await expect(await response.body).toStrictEqual({
				error: "Missing launch prop."
			});
		});
	});
});
