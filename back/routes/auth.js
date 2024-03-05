const express = require("express");
const router = express.Router();

// Controllers
const { login, createUser } = require("../controllers/auth");

router.route("/login").post(login);

router.route("/register").post(createUser);

module.exports = router;
