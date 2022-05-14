const express = require("express");
const planetsRouter = express.Router();
const { httpGetAllPlanets } = require("./planetsController");

planetsRouter.get("/", httpGetAllPlanets);

module.exports = planetsRouter;
