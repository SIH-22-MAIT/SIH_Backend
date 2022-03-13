const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords do not match"
    }
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

// Encrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;

  next();
});

// Verify Password
schema.methods.verifyPassword = async function (candidatePassword, password) {
  return await bcrypt.compare(candidatePassword, password);
};

const model = mongoose.model("User", schema);
export default model;
