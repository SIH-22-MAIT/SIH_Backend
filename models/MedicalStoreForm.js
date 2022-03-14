const mongoose = require("mongoose");

const schema = mongoose.Schema({
	medicalStoreID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true
	},
	quantity: {
		type: String,
		required: true
	},
	inTime: {
		type: Data,
		required: true
	},
	outTime: {
		type: Date,
		default: Date.now(),
		required: true
	},
	identity: {
		type: String,
		required: true
	},
	IMC: {
		type: String,
		required: true
	},
	prescription: {
		type: String,
		required: true
	},
	alert: {
		type: Boolean
	},
	AIalert: {
		type: Boolean
	}
});

const model = mongoose.model("Medical", schema);
module.exports = model;
