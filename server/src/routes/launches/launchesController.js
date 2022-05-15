const {
	getAllLaunches,
	addNewLaunch,
	existsLaunchWithId,
	abortLaunchById
} = require("../../models/launchesModel");

function httpGetAllLaunches(req, res) {
	return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
	const launch = req.body;
	if (
		!launch.mission ||
		!launch.rocket ||
		!launch.target ||
		!launch.launchDate
	) {
		return res.status(400).json({
			error: "Missing launch prop."
		});
	}
	launch.launchDate = new Date(launch.launchDate);
	if (isNaN(launch.launchDate)) {
		res.status(400).json({
			error: "Invalid launch date."
		});
	}
	addNewLaunch(launch);
	return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
	const launchId = Number(req.params.id);
	if (!existsLaunchWithId(launchId)) {
		return res.status(404).json({
			error: "Launch not found."
		});
	}
	return res.status(200).json(abortLaunchById(launchId));
}

module.exports = {
	httpGetAllLaunches,
	httpAddNewLaunch,
	httpAbortLaunch
};
