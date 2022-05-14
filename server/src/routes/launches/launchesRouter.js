const express = require("express");
const launchesRouter = express.Router();
const {
	httpGetAllLaunches,
	httpAddNewLaunch
} = require("./launchesController");

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);

module.exports = launchesRouter;
