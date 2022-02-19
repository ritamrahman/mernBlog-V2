const Product = require("../models/post");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const products = require("../data/data.json");

// setting dotenv file
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Post are deleted");

    await Product.insertMany(products);
    console.log("All Post are added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
