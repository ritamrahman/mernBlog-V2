const User = require("../models/user");
const Role = require("../models/role");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  // console.log("token", token);
  // const cookies = req.cookies;
  // console.log("cookies", cookies);

  if (!token) {
    return next(new ErrorHandler("Please Login first", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

// Handling user roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this page`, 403));
    }
    next();
  };
};

// Check role permissions
exports.checkPermissions = (...resourceName) =>
  catchAsyncErrors(async (req, res, next) => {
    const logUserRole = req.user;

    //   get role on Role collection
    let roleCollection = await Role.find({ name: logUserRole.role });

    let permissionExists = 0;

    // console.log(resourceName);

    for (let i = 0; i < roleCollection[0].permission.length; i++) {
      let rn = resourceName[0]; //value sent from role route
      let rcp = roleCollection[0].permission[i]; // values from db

      // check both value match or not
      if (rn === rcp) {
        // if permissionExists then value incresse
        permissionExists = 1;
      }
    }

    //   check assinged permission
    if (!permissionExists) {
      return next(new ErrorHandler(`You have no permission to perform this action`, 401));
    } else {
      next();
    }
  });

// Auto approved id has permissions

exports.autoApprovedIfHasPermission = (...resourceName) =>
  catchAsyncErrors(async (req, res, next) => {
    const logUserRole = req.user;

    //   get login user role on Role collection
    let roleCollection = await Role.find({ name: logUserRole.role });

    let permissionExists = 0;

    // console.log(resourceName);

    for (let i = 0; i < roleCollection[0].permission.length; i++) {
      let rn = resourceName[0]; //value sent from role route
      let rcp = roleCollection[0].permission[i]; // values from db

      // check both value match or not
      if (rn === rcp) {
        // if permissionExists then value incresse
        permissionExists = 1;
      }
    }

    //   check assinged permission
    if (!permissionExists) {
      next();
    } else {
      req.body.status = "Approved";

      next();
    }
  });
