const express = require("express");
const router = express.Router();

// import middlewares
const { isAuthenticatedUser, authorizeRoles, checkPermissions } = require("../middlewares/auth");

// import all controllers
const {
  createNewRole,
  updateRole,
  getAllRolesAndPermissions,
  getSingleRolesAndPermissions,
} = require("../controllers/roleController");

// define all routes

router.route("/role").post(isAuthenticatedUser, checkPermissions("role_create"), createNewRole);
router.route("/roles").get(isAuthenticatedUser, checkPermissions("role_get"), getAllRolesAndPermissions);
router.route("/role/:name").get(isAuthenticatedUser, checkPermissions("role_get"), getSingleRolesAndPermissions);
router.route("/role/update/:roleId").put(isAuthenticatedUser, checkPermissions("role_update"), updateRole);

module.exports = router;
