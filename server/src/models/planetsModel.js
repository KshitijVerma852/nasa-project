const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const planets = require("./planetsMongo");

const isHabitablePlanet = (planet) => {
	return (
		planet["koi_disposition"] === "CONFIRMED" &&
		planet["koi_insol"] > 0.36 &&
		planet["koi_insol"] < 1.11 &&
		planet["koi_prad"] < 1.6
	);
};

function loadPlanetsData() {
	return new Promise((resolve, reject) =>
		fs
			.createReadStream(
				path.join(__dirname, "..", "..", "data", "kepler_data.csv")
			)
			.pipe(
				parse({
					comment: "#",
					columns: true
				})
			)
			.on("data", async (data) => {
				if (isHabitablePlanet(data)) {
					await savePlanet(data);
				}
			})
			.on("error", (err) => {
				console.log(err);
				reject(err);
			})
			.on("end", async () => {
				const countPlanetsFound = await getAllPlanets();
				console.log(
					`${countPlanetsFound.length} habitable planets found.`
				);
				resolve();
			})
	);
}

function getAllPlanets() {
	return planets.find(
		{},
		{
			__v: 0,
			_id: 0
		}
	);
}

async function savePlanet(data) {
	try {
		await planets.updateOne(
			{
				keplerName: data["kepler_name"]
			},
			{
				keplerName: data["kepler_name"]
			},
			{
				upsert: true
			}
		);
	} catch (err) {
		console.error(`Could not save planet: ${err}`);
	}
}

module.exports = {
	loadPlanetsData,
	getAllPlanets
};
