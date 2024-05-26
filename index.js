const express = require("express");
const path = require("path");

const { connectMongoDB } = require("./connection");

// const urlRouter = require("./routes/url");
// const staticRoute = require("./routes/staticRouter");
// const userRoute = require("./routes/user");

// const cookieParser = require("cookie-parser");
// const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");

const app = express();
const PORT = 6000;

// Connect to MongoDB
connectMongoDB("mongodb://localhost:27017/code-sprint").then(() => {
  console.log("Connected to MongoDB");
});

// app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));

// middleware
app.use(express.json()); // Support JSON data
app.use(express.urlencoded({ extended: false })); // Support Form Data
app.use(express.static(path.join(__dirname, "styles"))); // Support static files
app.use(cookieParser());

// Routes

app.use("/url", restrictToLoggedInUserOnly, urlRouter);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

// Listen at PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
