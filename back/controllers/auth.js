const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};

// @desc    Login user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Validation error", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Validation error", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Validation error", 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      avatar: "https://i.imgur.com/6VBx3io.png",
      username,
      email,
      password,
    });
    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
}