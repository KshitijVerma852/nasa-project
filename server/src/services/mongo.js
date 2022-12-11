const mongoose = require("mongoose");

require("dotenv").config();

// Update below to match your own MongoDB connection string.
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
	console.log("Successfully connected to MongoDB.");
});

mongoose.connection.on("error", (err) => {
	console.error(err);
});

async function mongoConnect() {
	console.log("Connecting to MongoDB.");
	await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
	await mongoose.disconnect();
}

module.exports = {
	mongoConnect,
	mongoDisconnect
};
