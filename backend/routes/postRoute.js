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
  newPost,
  displayAllPosts,
  getMyAllPosts,
  getSinglePost,
  getRelatedPosts,
  getTrendingPosts,
  getFeaturedPosts,
  getRecentPosts,
  updatePost,
  deletePost,
  likePost,
  getAllPosts,
  getUserSinglePost,
  updateUsersPost,
  deleteUserPost,
} = require("../controllers/postController");

// define all routes

// PUBLIC ROUTES
router.route("/posts").get(displayAllPosts);
router.route("/posts/trending").get(getTrendingPosts);
router.route("/posts/featured").get(getFeaturedPosts);
router.route("/posts/recent").get(getRecentPosts);
router.route("/post/:id/related").get(getRelatedPosts);

// USER ROUTES
router.route("/post/create").post(isAuthenticatedUser, autoApprovedIfHasPermission("post_update_all"), newPost);
router.route("/me/posts").get(isAuthenticatedUser, getMyAllPosts);
router
  .route("/post/:id")
  .get(getSinglePost)
  .put(isAuthenticatedUser, updatePost)
  .delete(isAuthenticatedUser, deletePost);
router.route("/post/:id/like").put(isAuthenticatedUser, likePost);

// ADMIN ROUTES
router.route("/admin/posts").get(isAuthenticatedUser, checkPermissions("post_read_all"), getAllPosts);
router
  .route("/admin/post/:id")
  .get(isAuthenticatedUser, checkPermissions("post_read_all"), getUserSinglePost)
  .put(isAuthenticatedUser, checkPermissions("post_update_all"), updateUsersPost)
  .delete(isAuthenticatedUser, checkPermissions("post_delete_all"), deleteUserPost);

module.exports = router;
