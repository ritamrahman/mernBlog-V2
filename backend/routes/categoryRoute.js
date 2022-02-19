const express = require("express");
const router = express.Router();

// import middleware
const { isAuthenticatedUser, authorizeRoles, checkPermissions } = require("../middlewares/auth");

// import all controllers
const { newCategory, getAllCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");

// define all routes
// PUBLIC ROUTES
router.route("/categories").get(getAllCategories);

// USER ROUTES

// ADMIN ROUTES
router
  .route("/admin/category/create")
  .post(isAuthenticatedUser, checkPermissions("category_create_all"), authorizeRoles("admin"), newCategory);
router
  .route("/admin/category/:id")
  .put(isAuthenticatedUser, checkPermissions("category_update_all"), authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles("category_delete_all"), deleteCategory);

module.exports = router;
