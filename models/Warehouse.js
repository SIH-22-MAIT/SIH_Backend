const mongoose = require("mongoose");

const schema = mongoose.Schema({
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
export default model;
