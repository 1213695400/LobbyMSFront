const User = require("../models/User");

exports.getDatas = async (req, res, next) => {
  try {
    const users = await User.findOne({ _id: req.user.id });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.postDatas = async (req, res, next) => {
  try {
    const { username, password, avatar } = req.body;
    const { id } = req.user;
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(404).json("user not found");
    }
    if (avatar) {
      user.avatar = avatar;
    }
    if (username) {
      user.username = username;
    }
    if (password) {
      user.password = password;
    }
    await user.save();
    res.status(200).json("user updated");
  } catch (err) {
    res.status(500).json(err);
  }
};
