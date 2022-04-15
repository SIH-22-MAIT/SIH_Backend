const mongoose = require("mongoose");

const schema = mongoose.Schema({
	doctorID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true
	},
	patientID: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	dosage: {
		type: Number,
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	drugName: {
		type: Number,
		required: true
	}
});

const model = mongoose.model("Doctor", schema);
module.exports = model;
