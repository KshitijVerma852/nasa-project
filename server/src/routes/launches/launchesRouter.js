const express = require("express");
const launchesRouter = express.Router();
const { getAllLaunches } = require("./launchesController");

launchesRouter.get("/launches", getAllLaunches);

module.exports = launchesRouter;
