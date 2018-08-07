const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		select: false
	},
	token: String
}, {
	collection: "devices"
});

module.exports = mongoose.model("Device", schema);