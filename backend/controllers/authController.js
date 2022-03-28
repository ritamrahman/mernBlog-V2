const User = require("../models/user");
const bcrypt = require("bcryptjs");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary").v2;

const sendToken = require("../middlewares/jwtToken");

// Register user => api/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.formData);
  const result = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "blogUsersAvatar",
  });

  const { name, email, password } = req.body;

  // Encrypting password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPass,
    avatar: { public_id: result.public_id, url: result.secure_url },
  });

  sendToken(user, 200, res);
});

// Login user => api/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // if email and password fields is blank
  if (!email || !password) {
    return next(new ErrorHandler("Please enter both email and password", 400));
  }

  // find user in database
  const user = await User.findOne({ email }).select("+password");

  // if no usr found in database
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // check password correct or not
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout user => /api/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
