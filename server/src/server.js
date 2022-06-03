const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { loadPlanetsData } = require("./models/planetsModel");
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const MONGO_URL =
	"mongodb+srv://kshitijverma197:naveen76@nasaproject.tbadw.mongodb.net/Nasa-project?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
	console.log("MongoDB connection ready.");
});

mongoose.connection.on("error", (err) => {
	console.error(err);
});

async function startServer() {
	await mongoose.connect(MONGO_URL);
	await loadPlanetsData();
	server.listen(PORT, () => {
		console.log(`Listening on http://localhost:${PORT}`);
	});
}

startServer().then();
