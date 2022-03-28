const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
      maxLength: [100, "Title must be at least 100 characters"],
    },
    categories: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    commentCount: {
      type: Number,
      default: 0,
    },
    postViews: { type: Number, default: 0 },
    likesCount: {
      type: Number,
      default: 0,
    },
    featured: { type: Boolean, default: false },
    description: {
      type: String,
      required: [true, "Please write something here"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      // required: true,
      autopopulate: { select: "name -_id" },
    },
    likes: [
      {
        type: String,
      },
    ],

    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comment",
      },
    ],
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
  },
  { timestamps: true }
);

postSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Post", postSchema);
