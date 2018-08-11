const mongoose = require("mongoose");

let schema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		select: false
	},
	date: Date,
	block: String,
	description: String,
	audience: [{
		grade: Number,
		mandatory: Boolean
	}]
}, {
	collection: "events",
    versionKey: false
});

module.exports = mongoose.model("Event", schema);