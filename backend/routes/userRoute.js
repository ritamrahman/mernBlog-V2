const express = require("express");
const router = express.Router();

// import middlewares
const { isAuthenticatedUser, authorizeRoles, checkPermissions } = require("../middlewares/auth");

// import all controllers
const { getAllUsers, getUser, getUserProfile, deleteUser } = require("../controllers/userController");

// define all routes

// USER ROUTES
router.route("/me").get(isAuthenticatedUser, getUserProfile);

// ADMIN ROUTES
router.route("/admin/users").get(isAuthenticatedUser, checkPermissions("user_read_all"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, checkPermissions("user_read_all"), getUser)
  .delete(isAuthenticatedUser, checkPermissions("user_delete_all"), deleteUser);

module.exports = router;
