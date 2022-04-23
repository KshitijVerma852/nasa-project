const express = require("express");
const planetsRouter = express.Router();
const {
	getAllPlanets
} = require("./planetsController");

planetsRouter.get("/planets", getAllPlanets)

module.exports = planetsRouter;
