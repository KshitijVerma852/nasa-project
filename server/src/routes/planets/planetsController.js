const { getAllPlanets } = require("../../models/planetsModel");

function httpGetAllPlanets(req, res) {
	return res.status(200).json(getAllPlanets());
}

module.exports = {
	httpGetAllPlanets
};
