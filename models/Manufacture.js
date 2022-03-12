const mongoose = require("mongoose");

const schema = mongoose.Schema({
  lotId: {
    type: String,
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
  drugStatus: {
    type: String,
    required: true
  }
});

const model = mongoose.model("Manufacture", schema);
export default model;
