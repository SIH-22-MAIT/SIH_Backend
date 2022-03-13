const mongoose = require("mongoose");

const schema = mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  manufacturerId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  warehouses: {
    type: [mongoose.SchemaTypes.ObjectId],
    default: [],
    required: true
  },
  medicalId: {
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
export default model;
