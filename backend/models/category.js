const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, "Please write something here"],
      unique: true,
    },
    totalPosts: { type: Number, default: 0 },

    parentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
