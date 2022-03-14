const mongoose = require("mongoose");

const schema = mongoose.Schema({
	medicalStoreID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	inTime: {
		type: Date,
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
		type: Boolean,
		default: false
	},
	AIalert: {
		type: Boolean,
		default: false
	}
});

const model = mongoose.model("MedicalStore", schema);
module.exports = model;
