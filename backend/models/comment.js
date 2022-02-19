const mongoose = require("mongoose");
// const Populate = require("../utils/autopopulate");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      autopopulate: { select: "name -_id" },
    },
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: true,
    },
    comment: {
      type: String,
      required: [true, "Please write something"],
    },
    likes: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    parentCommentId: {
      type: mongoose.Schema.ObjectId,
      ref: "comment",
      autopopulate: true,
    },
  },
  { timestamps: true }
);
commentSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("comment", commentSchema);
