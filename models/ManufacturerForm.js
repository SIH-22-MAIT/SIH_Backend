const mongoose = require("mongoose");

const schema = mongoose.Schema({
	manufacturerID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true
	},
	drugName: {
		type: String,
		required: true
	},
	quantity: {
		type: String,
		required: true
	},
	outTime: {
		type: Date,
		default: Date.now(),
		required: true
	},
	prescription: {
		type: Boolean,
		required: true
	}
});

const model = mongoose.model("Manufacturer", schema);
module.exports = model;
