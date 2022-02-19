const User = require("../models/user");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Comment = require("../models/comment");
const Post = require("../models/post");

// ==> USER
// Get currently logged in user => api/user/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const logUser = await req.user.id;

  if (!logUser) {
    return next(new ErrorHandler("Please log in first", 401));
  }

  const user = await User.findById(logUser);

  const { posts, ...userInfo } = user._doc;

  res.status(200).json({
    success: true,
    userInfo,
  });
});

// Update user profile => api/me/:id
// --ToDo

// ==> ADMIN
// Get all users => api/admin/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    totalUsers: users.length,
    users,
  });
});

// Get single user => api/admin/user/:id
exports.getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("posts");

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  res.status(200).json({
    success: true,
    totalPosts: user.posts.length,
    user,
  });
});

//  Delete user => /api/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // get all posts of this user
  const getAllPosts = await Post.find({ _id: user });
  // get all comments of this user
  const getAllComments = await Comment.find({ _id: user });

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  // check this user super_admin or not
  if (user.role === "super_admin") {
    return next(new ErrorHandler("You cannot delete this profile"));
  }

  if (getAllPosts) {
    // delete all posts
    await Post.deleteMany({ getAllPosts });
  }
  // delete all comments
  if (getAllComments) {
    await Comment.deleteMany({ getAllComments });
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "user deleted",
  });
});
