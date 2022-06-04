const mongoose = require("mongoose");
const MONGO_URL =
	"mongodb+srv://kshitijverma197:naveen76@nasaproject.tbadw.mongodb.net/Nasa-project?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
	console.log("MongoDB connection ready.");
});

mongoose.connection.on("error", (err) => {
	console.error(err);
});

async function mongoConnect() {
	await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
	await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
