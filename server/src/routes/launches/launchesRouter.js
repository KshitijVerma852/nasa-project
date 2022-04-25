const express = require("express");
const launchesRouter = express.Router();
const { httpGetAllLaunches } = require("./launchesController");

launchesRouter.get("/launches", httpGetAllLaunches);

module.exports = launchesRouter;
