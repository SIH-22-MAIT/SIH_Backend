const mongoose = require("mongoose");

const schema = mongoose.Schema({
  warehouseID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  lotId: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
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
    type: Boolean
  },
  AIalert: {
    type: Boolean
  }
});

const model = mongoose.model("Warehouse", schema);
module.exports = model;
