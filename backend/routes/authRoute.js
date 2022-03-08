const express = require("express");
const router = express.Router();

// import all controllers
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");

// define all routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

module.exports = router;
