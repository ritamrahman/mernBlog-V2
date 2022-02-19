const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
      unique: true,
    },
    totalPosts: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tag", tagSchema);
