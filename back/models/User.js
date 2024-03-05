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
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);

// create a static method to hash the password and save it to the database
UserSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

module.exports = User;
