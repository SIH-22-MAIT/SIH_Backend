const mongoose = require("mongoose");

const schema = mongoose.Schema({
	medicalStoreID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true
	},
	quantitySold: {
		type: Number,
		required: true
	},
	sellingTime: {
		type: Date
	},
	prescription: {
		type: String,
		required: true
	}
});

const model = mongoose.model("MedicalStoreOutgoing", schema);
module.exports = model;
