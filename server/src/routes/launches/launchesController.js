const { getAllLaunches } = require("../../models/launchesModel");

function httpGetAllLaunches(req, res) {
	return res.status(200).json(getAllLaunches());
}

module.exports = {
	httpGetAllLaunches
};
