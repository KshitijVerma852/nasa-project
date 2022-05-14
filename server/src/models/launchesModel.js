const launches = new Map();
let latestFlightNumber = 100;

const launch = {
	flightNumber: 100,
	mission: "Kepler Exploration X",
	rocket: "Explorer IS1",
	launchDate: new Date("December 27, 2030"),
	destination: "Kepler-422 b",
	customer: ["NASA", "Vision"],
	upcoming: true,
	success: true
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
	return Array.from(launches.values());
}

function addNewLaunch(launch) {
	latestFlightNumber++;
	launches.set(
		latestFlightNumber,
		Object.assign(launch, {
			flightNumber: latestFlightNumber,
			customers: ["Vision", "NASA"],
			upcoming: true,
			success: true
		})
	);
}

module.exports = {
	getAllLaunches,
	addNewLaunch
};
