const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");

const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));

// Import all routes
const posts = require("./routes/postRoute");
const auth = require("./routes/authRoute");
const role = require("./routes/roleRoute");
const user = require("./routes/userRoute");
const category = require("./routes/categoryRoute");
const comment = require("./routes/commentRoute");

// solve cros issue
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Methods", "Content-Type");
  next();
});

app.use("/api", posts);
app.use("/api", auth);
app.use("/api", role);
app.use("/api", user);
app.use("/api", category);
app.use("/api", comment);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
