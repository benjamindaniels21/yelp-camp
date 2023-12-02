const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");

const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate); //tells app to use ejsMate as the engine instead of the default one

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const sessionConfig = {
  secret: "thisismysecret",
  resave: false,
  saveUninitialized: true,
  expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //expires in a week (in milliseconds)
  maxAge: 1000 * 60 * 60 * 24 * 7, //expires in a week (in milliseconds)
};
app.use(session(sessionConfig));
app.use(flash);

app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found!", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no, something went wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("serving on port 3000");
});
