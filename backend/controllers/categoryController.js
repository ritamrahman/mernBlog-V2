const catchAsyncErrors = require("../middlewares/catchAsyncError");
const Category = require("../models/category");
const ErrorHandler = require("../utils/errorHandler");
const slugify = require("slugify");

// recursive function for createCategory
// function createCategories(categories, parentId = null) {
//   var categoryList = [];
//   let category;
//   // console.log("recursive run");
//   if (parentId === null) {
//     // console.log("block1");
//     category = categories.filter((cat) => cat.parentId === undefined);
//   } else {
//     // console.log("block2");
//     category = categories.filter((cat) => cat.parentId === parentId);
//   }

//   for (let cate of category) {
//     // console.log("for");
//     categoryList.push({
//       _id: cate._id,
//       name: cate.name,
//       slug: cate.slug,
//       children: createCategories(category, cate._id),
//     });
//     // console.log(categoryList);
//   }
// }

// -------------Function----------------
function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

// ==> PUBLIC
// Get all categories => /api/categories
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
});

// ==> ADMIN
// Create new category => /api/admin/category/create
exports.newCategory = catchAsyncErrors(async (req, res, next) => {
  let data = req.body;

  data.slug = slugify(data.name);

  if (data.parentId) {
    data.parentId = data.parentId;
  }

  // save category on db
  const newCategory = await Category.create(data);

  res.status(200).json({
    success: true,
    newCategory,
  });
});

//  Update category => /api/admin/category/:id
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found"));
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    category,
  });
});

//  Delete category => /api/admin/category/:id
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  if (req.user.role === "admin") {
    await category.deleteOne();
  }

  res.status(200).json({
    success: true,
    message: "Category deleted",
  });
});
