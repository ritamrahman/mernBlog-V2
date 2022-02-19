const express = require("express");
const router = express.Router();

// import middleware
const {
  isAuthenticatedUser,
  authorizeRoles,
  checkPermissions,
  autoApprovedIfHasPermission,
} = require("../middlewares/auth");

// import all controllers
const {
  newComment,
  displayAllCommentsThisPosts,
  updateComment,
  updateUserComment,
  deleteUserComment,
} = require("../controllers/commentConrtoller");

// PUBLIC ROUTES
router.route("/comments/:postId").post(displayAllCommentsThisPosts); //get all comments

// USER ROUTES
// define all routes
router
  .route("/comment/:postId")
  .post(isAuthenticatedUser, autoApprovedIfHasPermission("comment_update_all"), newComment); // create new comment
router.route("/comment/:id").put(isAuthenticatedUser, updateComment); // update my comment

// ADMIN ROUTES
router
  .route("/admin/comment/:id")
  .put(
    isAuthenticatedUser,
    checkPermissions("comment_update_all"),
    autoApprovedIfHasPermission("comment_update_all"),
    updateUserComment
  )
  .delete(isAuthenticatedUser, checkPermissions("comment_delete_all"), deleteUserComment); // delete user comment

module.exports = router;
