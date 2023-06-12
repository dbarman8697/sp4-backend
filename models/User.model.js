const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: String, required: true },
    city: { type: String, required: true },
    is_married: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("instaUser", userSchema);

module.exports = { UserModel };
