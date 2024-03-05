const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userAuth = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};
