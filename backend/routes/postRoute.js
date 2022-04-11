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
  deleteAllPosts,
  getPostsByCategory,
} = require("../controllers/postController");

// define all routes

// PUBLIC ROUTES
router.route("/posts").get(displayAllPosts); //get all Approved posts
router.route("/posts/:category").get(getPostsByCategory); //Get posts by category
router.route("/trending").get(getTrendingPosts); //get trending posts
router.route("/posts/featured").get(getFeaturedPosts); //get featured posts
router.route("/posts/recent").get(getRecentPosts); //get all recent posts
router.route("/post/:id/related").get(getRelatedPosts); //get all related posts

// USER ROUTES
router.route("/post/create").post(isAuthenticatedUser, autoApprovedIfHasPermission("post_update_all"), newPost); //create new post
router.route("/me/posts").get(isAuthenticatedUser, getMyAllPosts); //get my posts
router
  .route("/post/:id")
  .get(getSinglePost) //get single post
  .put(isAuthenticatedUser, updatePost) //update post
  .delete(isAuthenticatedUser, deletePost); //delate post
router.route("/post/:id/like").put(isAuthenticatedUser, likePost); //like&Unlike Post

// ADMIN ROUTES
router.route("/admin/posts").get(isAuthenticatedUser, checkPermissions("post_read_all"), getAllPosts); //get all posts
router
  .route("/admin/post/:id")
  .get(isAuthenticatedUser, checkPermissions("post_read_all"), getUserSinglePost) //get user single post
  .put(isAuthenticatedUser, checkPermissions("post_update_all"), updateUsersPost) //update users post
  .delete(isAuthenticatedUser, checkPermissions("post_delete_all"), deleteUserPost); //delate users post

// Delete all Posts and comments
router.route("/admin/posts/deleteall").delete(isAuthenticatedUser, checkPermissions("post_delete_all"), deleteAllPosts); //Delete Database's all posts

module.exports = router;
