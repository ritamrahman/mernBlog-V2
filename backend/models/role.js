const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    permission: [
      {
        type: String,
        required: [true, "Please assign some permission"],
        trim: true,
        lowercase: true,
        unique: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
