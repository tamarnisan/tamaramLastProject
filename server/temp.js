const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const logIn = require("./routes/logIn");
const register = require("./routes/register");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const http = require("http");
const app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/logIn", logIn);
app.use("/register", register);
app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

http.createServer(app).listen(300);

module.exports = app;
