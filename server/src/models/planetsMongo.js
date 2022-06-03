const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema(
	{
		keplerName: {
			type: String,
			required: true
		}
	},
	{
		versionKey: false
	}
);

module.exports = mongoose.model("Planet", planetSchema);
