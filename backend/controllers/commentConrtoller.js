const catchAsyncErrors = require("../middlewares/catchAsyncError");
const { autoApprovedIfHasPermission } = require("../middlewares/auth");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const ErrorHandler = require("../utils/errorHandler");
const comment = require("../models/comment");
const ApiFeatures = require("../utils/apiFeatures");

// ==> PUBLIC CONTROLLER
// Get all comments => /api/comments

// -------------Function----------------
// function createComment(comments, parentCommentId = null) {
//   const commentList = [];
//   let comment;
//   if (parentCommentId == null) {
//     comment = comments.filter((cat) => cat.parentCommentId == undefined);
//   } else {
//     comment = comments.filter((cat) => cat.parentCommentId == parentCommentId);
//   }

//   for (let cmt of comment) {
//     commentList.push({
//       _id: cmt._id,
//       user: cmt.user,
//       postId: cmt.postId,
//       comment: cmt.comment,
//       likes: cmt.likes,
//       parentCommentId: cmt.parentCommentId,
//       reply: createComment(comments, cmt._id),
//     });
//   }

//   return commentList;
// }

// exports.displayAllCommentsThisPosts = catchAsyncErrors(async (req, res, next) => {
//   Comment.find({ postId: req.params.postId })
//     // .populate("user", "name -_id")
//     .exec((error, comments) => {
//       if (error) return res.status(400).json({ error });
//       if (comments) {
//         const commentList = createComment(comments);
//         res.status(200).json({
//           totalComments: commentList.length,
//           commentList,
//         });
//       }
//     });
// });

exports.displayAllCommentsThisPosts = catchAsyncErrors(async (req, res, next) => {
  // const commentList = await Comment.find({ postId: req.params.postId });
  const resPerPage = 5;

  const apiFeatures = new ApiFeatures(Comment.find({ status: "Approved" }), req.query).pagination(resPerPage);
  let totalComments = await Post.findById(req.params.postId);
  totalComments = await totalComments.commentCount;
  let comments = await apiFeatures.query;
  res.status(200).json({
    success: true,
    totalComments,
    comments,
  });
});

// ==> USER CONTROLLER
// Create new comment => /api/comment/:postId
exports.newComment = catchAsyncErrors(async (req, res, next) => {
  let data = req.body;

  //  get login user id from cookie adn set to user
  data.user = req.user.id;

  //   insert logUser id and commenting post id before save on db
  data.user = req.user.id;
  data.postId = req.params.postId;

  if (data.parentCommentId) {
    data.parentCommentId = data.parentCommentId;
  }

  // save comment on db
  const newComment = await Comment.create(data);

  // check post status
  if (newComment.status === "Approved") {
    const post = await Post.findById(req.params.postId);

    // increase or decrease comments count on post
    await post.updateOne({ $inc: { commentCount: 1 } });
  }

  res.status(200).json({
    success: true,
    newComment,
  });
});

// Update comment => /api/comment/:id
exports.updateComment = catchAsyncErrors(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new ErrorHandler("comment not found"));
  }

  if (req.body.status) {
    return next(new ErrorHandler("You cannot update comment status"));
  }

  // check owner of comment
  let commentUser = await comment.user;

  let user = req.user.id;
  // find cookie user on db
  user = await User.findById(user);
  // console.log(commentUser["name"], "==", user.name);

  if (commentUser["name"] === user.name) {
    comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  } else {
    return next(new ErrorHandler("You can not update this comment", 401));
  }

  res.status(200).json({
    success: true,
    comment,
  });
});

// delete comment => /api/comment/:id
exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new ErrorHandler("comment not found"));
  }

  // check owner of comment
  let commentUser = await comment.user;

  let user = req.user.id;
  // find cookie user on db
  user = await User.findById(user);
  // console.log(commentUser["name"], "==", user.name);

  if (commentUser["name"] === user.name) {
    comment = await Comment.findByIdAndDelete(req.params.id);
  } else {
    return next(new ErrorHandler("You can not delete this comment", 401));
  }

  res.status(200).json({
    success: true,
    message: "Comment deleted",
  });
});

// ==> ADMIN CONTROLLER
// Update comment => /api/admin/comment/:id
exports.updateUserComment = catchAsyncErrors(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new ErrorHandler("comment not found"));
  }

  comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // Check comment Approved or not
  if (comment.status === "Approved") {
    const post = await Post.findById(comment.postId);

    // increase or decrease comments count on post
    await post.updateOne({ $inc: { commentCount: 1 } });
  }

  res.status(200).json({
    success: true,
    comment,
  });
});

// delete comment => /api/comment/:id
exports.deleteUserComment = catchAsyncErrors(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new ErrorHandler("comment not found"));
  }

  const post = await Post.findById(comment.postId);

  // delete comment on db
  await Comment.findByIdAndDelete(req.params.id);
  // decrease comments count on post
  await post.updateOne({ $inc: { commentCount: -1 } });

  res.status(200).json({
    success: true,
    message: "Comment deleted",
  });
});
