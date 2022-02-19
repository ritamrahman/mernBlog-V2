const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

// Setting up config file
dotenv.config({ path: "backend/config/config.env" });

// Connecting database
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.NODE_ENV} on PORT: ${process.env.PORT}`);
});
