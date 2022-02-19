const Role = require("../models/role");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

// Create new role => api/role
exports.createNewRole = catchAsyncErrors(async (req, res, next) => {
  let data = req.body;

  // save post on db
  const newRole = await Role.create(data);

  res.status(200).json({
    success: true,
    newRole,
  });
});

// Update role and permission => api/role/update/:roleId
exports.updateRole = catchAsyncErrors(async (req, res, next) => {
  let data = req.body;

  // find role on db
  let role = await Role.findById(req.params.roleId);

  // check role already exist or not in db
  if (!role) {
    return next(new ErrorHandler("Role not found"));
  }

  if (data.name) {
    await role.updateOne({ name: data.name }, { new: true });
  }

  // check new permissions already exist or not in db
  const filterPermission = data.permission.filter((currentPermission) => !role.permission.includes(currentPermission));

  // save updated permissions on db
  await role.updateOne({ $push: { permission: filterPermission } });

  res.status(200).json({
    success: true,
    role,
  });
});

// get all role and permissions => api/roles
exports.getAllRolesAndPermissions = catchAsyncErrors(async (req, res, next) => {
  const allRoles = await Role.find({});

  res.status(200).json({
    success: true,
    allRoles,
  });
});

// get single role and permissions => api/role/:id
exports.getSingleRolesAndPermissions = catchAsyncErrors(async (req, res, next) => {
  const role = await Role.find({ name: req.params.name });

  if (!role) {
    return next(new ErrorHandler("Role not found", 404));
  }

  res.status(200).json({
    success: true,
    role,
  });
});
