const mongoose = require("mongoose");

const schema = mongoose.Schema({
	manufacturerFormID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true
	},
	warehousesFormID: {
		type: [mongoose.SchemaTypes.ObjectId],
		default: [],
		required: true
	},
	medicalStoreFormID: {
		default: null,
		type: mongoose.SchemaTypes.ObjectId,
		required: true
	},
	completed: {
		type: Boolean,
		default: false,
		required: true
	}
});

const model = mongoose.model("Order", schema);
module.exports = model;
