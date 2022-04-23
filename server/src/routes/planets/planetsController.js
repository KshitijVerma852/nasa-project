const { planets } = require("../../models/planetsModel");

function getAllPlanets(req, res) {
	return res.status(200).json(planets);
}

module.exports = {
	getAllPlanets
};
