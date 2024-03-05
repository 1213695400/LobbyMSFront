const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  wechat: {
    type: String,
    required: [true, "Please provide a wechat"],
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  account: {
    type: String,
    required: [true, "Please provide a account"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  inviteList: {
    type: Array,
    default: [],
  },
  inviteby: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
