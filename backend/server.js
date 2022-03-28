const app = require("./app");
const cloudinary = require("cloudinary");

const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

// Setting up config file
dotenv.config({ path: "backend/config/config.env" });

// Connecting database
connectDatabase();

// Setting up  cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.NODE_ENV} on PORT: ${process.env.PORT}`);
});
