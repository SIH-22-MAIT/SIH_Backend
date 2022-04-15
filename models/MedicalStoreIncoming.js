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
	exhaustTime: {
		type: Date
	},
	IMC: {
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

const model = mongoose.model("MedicalStoreIncoming", schema);
module.exports = model;
