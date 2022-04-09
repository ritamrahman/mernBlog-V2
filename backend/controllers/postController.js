const catchAsyncErrors = require("../middlewares/catchAsyncError");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Category = require("../models/category");
const User = require("../models/user");
const Tag = require("../models/tag");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// ==> PUBLIC CONTROLLER
// Get all posts => /api/posts
exports.displayAllPosts = catchAsyncErrors(async (req, res, next) => {
  // let posts = [];
  // let query = {};
  const resPerPage = 10;

  const postsCount = await Post.countDocuments();

  const apiFeatures = new ApiFeatures(Post.find({ status: "Approved" }).sort({ updatedAt: -1 }), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  let posts = await apiFeatures.query;

  res.status(200).json({
    success: true,
    postsCount,
    // // resPerPage,
    postFound: posts.length,
    posts,
  });
});

// Get single posts => /api/post/:id
exports.getSinglePost = catchAsyncErrors(async (req, res, next) => {
  let post = await Post.findOne({ _id: req.params.id, status: "Approved" }).populate("user", "name -_id");

  if (!post) {
    return next(new ErrorHandler("no post found", 404));
  }

  // update post views
  await post.updateOne({ $inc: { postViews: 1 } });

  res.status(200).json({
    success: true,
    // likesCount: post.likes.length,
    // commentsCount: post.comments.length,
    post,
  });
});

// Get posts by category => /api/post/:category
exports.getPostsByCategory = catchAsyncErrors(async (req, res, next) => {
  let post = await Post.find({ categories: req.params.category, status: "Approved" }).populate("user", "name -_id");

  if (!post) {
    return next(new ErrorHandler("no post found", 404));
  }

  res.status(200).json({
    success: true,
    // likesCount: post.likes.length,
    postsCount: post.length,
    post,
  });
});

// Get related & Current author popular posts posts => /api/post/:id/related (on category)
exports.getRelatedPosts = catchAsyncErrors(async (req, res, next) => {
  let post = await Post.findById(req.params.id, {}, { autopopulate: false }); //get current post

  const ctgName = post.categories; //get current post ctg

  const posts = await Post.find({ categories: ctgName, status: "Approved" }).limit(3);

  // exclude current post from the related posts array
  const relatedPosts = posts.filter((post) => post._id != req.params.id);

  // ==> This author popular posts on views
  // get post user name
  const author = await post.user.toString();

  // find post by user id
  let authorPost = await Post.find({ user: author, status: "Approved" }).sort({ postViews: -1 }).limit(3);

  // exclude current post from the related posts array
  authorPost = authorPost.filter((post) => post._id != req.params.id);

  res.status(200).json({
    success: true,
    totalPosts: relatedPosts.length,
    relatedPosts,
    totalPopularPosts: authorPost.length,
    thisAuthorPosts: authorPost,
  });
});

// Get trending posts => /api/posts/trending (on views)
exports.getTrendingPosts = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.find({ status: "Approved" }).sort({ postViews: -1 }).limit(3);

  res.status(200).json({
    success: true,
    totalPosts: post.length,
    post,
  });
});

// Get featured posts => /api/posts/featured
exports.getFeaturedPosts = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.find({ status: "Approved", featured: "true" }).limit(5);

  res.status(200).json({
    success: true,
    totalPosts: post.length,
    post,
  });
});

// Get recent posts => /api/posts/recent (on created time)
exports.getRecentPosts = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.find({ status: "Approved" }).sort({ createdAt: -1 }).limit(5);

  res.status(200).json({
    success: true,
    totalPosts: post.length,
    post,
  });
});

// ==> USER CONTROLLER
// Create new post => /api/post/create
exports.newPost = catchAsyncErrors(async (req, res, next) => {
  let data = req.body;

  // get login user id from cookie and set to user
  data.user = req.user.id;

  // check user role
  // ---if user role is admin then set post status Approved
  if (req.user.role === "admin") {
    // req.body.status = "Approved";
    data.status = "Approved";
  }

  // save post on db
  const newPost = await Post.create(data);

  // update category post number
  const category = await Category.findOne({ name: newPost.categories });
  // console.log(category);

  if (!category) {
    return next(new ErrorHandler("Category not found!", 404));
  }

  await category.updateOne({ $inc: { totalPosts: 1 } });
  const user = await User.findById(req.user.id);

  await user.updateOne({ $push: { posts: newPost._id } });

  res.status(200).json({
    success: true,
    newPost,
  });
});

//  Update post => /api/post/:id
exports.updatePost = catchAsyncErrors(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post not found"));
  }

  if (req.body.status) {
    return next(new ErrorHandler("You cannot update comment status"));
  }

  // check owner of post
  let postUser = await post.user;

  let user = req.user.id;
  // find cookie user on db
  user = await User.findById(user);
  // console.log(postUser["name"], "==", user.name);

  if (postUser["name"] === user.name) {
    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  } else {
    return next(new ErrorHandler("You can not update this post", 401));
  }

  res.status(200).json({
    success: true,
    post,
  });
});

//  Delete post => /api/post/:id
exports.deletePost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  // check owner of post
  const postUser = await post.user.toString();
  const user = req.user.id;

  if (postUser === user) {
    // check post status
    // if is post is allrady approved thn throw an warning message
    if (post.status === "Approved") {
      return next(new ErrorHandler("You can not delete this post. Please talk to your admin", 401));
    } else {
      await post.deleteOne();
    }
  } else {
    return next(new ErrorHandler("You can not delete this post", 401));
  }

  res.status(200).json({
    success: true,
    message: "Post deleted",
  });
});

// Get all logged in user posts => /api/me/posts
exports.getMyAllPosts = catchAsyncErrors(async (req, res, next) => {
  // get logged user id
  const logUser = await req.user.id;

  if (!logUser) {
    return next(new ErrorHandler("Please log in first", 401));
  }

  const userDetails = await User.findById(logUser).populate("posts", "-user");
  const loggedInUserPosts = await userDetails.posts;

  res.status(200).json({
    success: true,
    totalPosts: loggedInUserPosts.length,
    loggedInUserPosts,
  });
});

// Like/Unlike post => /api/post/:id/like
exports.likePost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id); //get current post

  const logUser = await req.user.id.toString(); //get login use _id

  if (!logUser) {
    return next(new ErrorHandler("Please log in first", 401));
  }

  if (!post.likes.includes(logUser)) {
    // and adding LogUser id in likes array
    await post.updateOne({ $push: { likes: logUser } });
    // if not include LogUser id then increase likesCount by +1
    await post.updateOne({ $inc: { likesCount: 1 } });

    res.status(200).json({
      success: true,
      message: "like added successfully",
    });
  } else {
    // if include LogUser id then decrease likesCount by -1
    await post.updateOne({ $inc: { likesCount: -1 } });
    // await post.updateOne([post.likes != 0 && { likesCount: -1 }]);
    // and adding LogUser id in likes array
    await post.updateOne({ $pull: { likes: logUser } });
    res.status(200).json({
      success: true,
      message: "like removed successfully",
    });
  }
});

// ==> ADMIN CONTROLLER
// Get all posts => /api/admin/posts
exports.getAllPosts = catchAsyncErrors(async (req, res, next) => {
  // const posts = await Post.find({}).populate("user", "name , -_id");
  const posts = await Post.find({}).populate([
    {
      path: "user",
      select: "name -_id",
    },
  ]);

  // posts.comments.forEach(async (comment) => {
  //   await Comment.findById(comment.toString());
  // });

  res.status(200).json({
    success: true,
    totalPosts: posts.length,
    posts,
  });
});

// Get single posts => /api/admin/post/:id
exports.getUserSinglePost = catchAsyncErrors(async (req, res, next) => {
  let post = await Post.findById(req.params.id).populate("user", "name -_id");

  if (!post) {
    return next(new ErrorHandler("no post found", 404));
  }

  res.status(200).json({
    success: true,
    likesCount: post.likes.length,
    commentsCount: post.commentCount,
    totalViews: post.postViews,
    post,
  });
});

//  Update post => /api/admin/post/:id
exports.updateUsersPost = catchAsyncErrors(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post not found"));
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    post,
  });
});

//  Delete post => /api/admin/post/:id
exports.deleteUserPost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const allComments = await Comment.find({ postId: post._id });

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  // delete all comments on this post
  await Comment.deleteMany({ allComments });

  // delete this post
  await post.deleteOne();

  res.status(200).json({
    success: true,
    message: "Post deleted",
  });
});

//  Delete All posts => /api/admin/posts/deleteall
exports.deleteAllPosts = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.find({});
  const allComments = await Comment.find({});

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  // delete all comments on this post
  await Comment.deleteMany({ allComments });

  // delete this post
  await Post.deleteMany({ post });

  res.status(200).json({
    success: true,
    message: "All Posts/Comments deleted",
  });
});
