const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const models = require("./models/index");
const db = require("./models/db");

db.sync({
  // alter: true,
}).then(() => {
  console.log("[ORM]", "Data inited");
});

const cors = require("cors");
const logger = require("morgan");
const session = require("express-session");

const goldLogRouter = require("./routes/index");

const app = express();
app.set("view engine", "html");
app.use(cors(require("./config").cors));
app.set("trust proxy", 2); // trust first proxy
app.use(cookieParser());
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/goldlog", goldLogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  // res.render("error");
  res.json(err);
});

module.exports = app;
