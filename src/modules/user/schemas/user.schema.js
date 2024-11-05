const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  login: { type: String, required: true, max: 50 },
  password: { type: String, required: true },
  fullName: String,
  age: Number,
  role: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  count: { type: Number, default: 0 },
  code: { type: String, default: null, required: false },
});
const UserModel = model("User", userSchema, "users");

module.exports = { UserModel };
