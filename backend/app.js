const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");

app.use(express.json());
app.use(cookieParser());

// Import all routes
const posts = require("./routes/postRoute");
const auth = require("./routes/authRoute");
const role = require("./routes/roleRoute");
const user = require("./routes/userRoute");
const category = require("./routes/categoryRoute");
const comment = require("./routes/commentRoute");

app.use("/api", posts);
app.use("/api", auth);
app.use("/api", role);
app.use("/api", user);
app.use("/api", category);
app.use("/api", comment);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
