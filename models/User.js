const mongoose = require("mongoose");

const schema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ["manufacturer", "medical", "warehouse"]
  },
  roleId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  }
});

const model = mongoose.model("User", schema);
export default model;
