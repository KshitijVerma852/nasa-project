const axios = require("axios");
const launches = require("./launchesMongo");
const planets = require("./planetsMongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
	flightNumber: 100, // flight_number
	mission: "Kepler Exploration X", // name
	rocket: "Explorer IS1", // rocket.name
	launchDate: new Date("December 27, 2030"), // date_local
	target: "Kepler-442 b", // NA
	customer: ["NASA", "Vision"], //payload.customers for each payload
	upcoming: true, // upcoming
	success: true // success
};

saveLaunch(launch).then(() => {
	console.log("Launch saved.");
});

async function getAllLaunches() {
	return launches.find(
		{},
		{
			_id: 0,
			__v: 0
		}
	);
}

async function saveLaunch(launch) {
	const planet = await planets.findOne({
		keplerName: launch.target
	});
	if (!planet) {
		throw new Error("No matching planet found.");
	}
	await launches.findOneAndUpdate(
		{
			flightNumber: launch.flightNumber
		},
		launch,
		{ upsert: true }
	);
}

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function loadLaunchData() {
	console.log("Downloading launch data...");
	const response = await axios.post(SPACEX_API_URL, {
		query: {},
		options: {
			populate: [
				{
					path: "rocket",
					select: {
						name: 1
					}
				},
				{
					path: "payloads",
					select: {
						customers: 1
					}
				}
			]
		}
	});
	const launchDocs = response.data.docs;
	for (const launchDoc of launchDocs) {
		const payloads = launchDoc["payloads"];
		const customers = payloads.flatMap((payload) => payload["customer"]);

		const launch = {
			flightNumber: launchDoc["flight_number"],
			mission: launchDoc["name"],
			rocket: launchDoc["rocket"]["name"],
			launchDate: launchDoc["date_local"],
			upcoming: launchDoc["upcoming"],
			success: launchDoc["success"],
			customers
		};

		console.log(`${launch.flightNumber} ${launch.mission}`);
	}
}

async function scheduleNewLaunch(launch) {
	const newFlightNumber = (await getLatestFlightNumber()) + 1;
	const newLaunch = Object.assign(launch, {
		success: true,
		upcoming: true,
		customers: ["Vision", "NASA"],
		flightNumber: newFlightNumber
	});
	await saveLaunch(newLaunch);
}

async function existsLaunchWithId(launchId) {
	return launches.findOne({
		flightNumber: launchId
	});
}

async function getLatestFlightNumber() {
	const latestLaunch = await launches.findOne().sort("-flightNumber");

	if (!latestLaunch) {
		return DEFAULT_FLIGHT_NUMBER;
	}
	return latestLaunch["flightNumber"];
}

async function abortLaunchById(launchId) {
	const aborted = await launches.updateOne(
		{
			flightNumber: launchId
		},
		{
			upcoming: false,
			success: false
		}
	);
	return aborted["modifiedCount"] === 1;
}

module.exports = {
	getAllLaunches,
	loadLaunchData,
	scheduleNewLaunch,
	existsLaunchWithId,
	abortLaunchById
};
