const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./services/mongo");
const { loadPlanetsData } = require("./models/planetsModel");
const { loadLaunchData } = require("./models/launchesModel");
const server = http.createServer(app);
require("dotenv").config();
const PORT = process.env.PORT || 8000;

async function startServer() {
	await mongoConnect();
	await loadPlanetsData();
	await loadLaunchData();
	server.listen(PORT, () => {
		console.log(`Listening on http://localhost:${PORT}`);
	});
}

startServer().then();
