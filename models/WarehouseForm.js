const mongoose = require("mongoose");

const schema = mongoose.Schema({
	warehouseID: {
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
	alert: {
		type: Boolean,
		default: false
	},
	AIalert: {
		type: Boolean,
		default: false
	}
});

const model = mongoose.model("Warehouse", schema);
module.exports = model;
