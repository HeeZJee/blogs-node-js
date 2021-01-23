"use strict";

var express = require("express");

var morgan = require("morgan");

var mongoose = require("mongoose");

var Blog = require("./models/blogs"); // console.log(Blog);


var _require = require("./config"),
    PORT = _require.PORT,
    USER = _require.USER,
    PASS = _require.PASS,
    DB_NAME = _require.DB_NAME;

var _require2 = require("lodash"),
    result = _require2.result;

var app = express();
var dbURI = "mongodb+srv://".concat(USER, ":").concat(PASS, "@blog-cluster.oyikf.mongodb.net/").concat(DB_NAME, "?retryWrites=true&w=majority"); // connect to mongodb

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return app.listen(PORT);
})["catch"](function (err) {
  return console.error(err);
}); // register view engine

app.set("view engine", "ejs");
app.set("views", "html"); // const port = 3000;

app.use(morgan("dev"));
app.use(express["static"]("public"));
app.get("/", function (req, res) {
  // const blogs = [
  //   {
  //     title: "From Earth to Space and Beyond",
  //     snippet:
  //       " Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate enim hic omnis, corrupti natus deserunt totam quae officia quos impedit.",
  //   },
  //   {
  //     title: "From Earth to Space and Beyond",
  //     snippet:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate enim hic omnis, corrupti natus deserunt totam quae officia quos impedit.",
  //   },
  //   {
  //     title: "From Earth to Space and Beyond",
  //     snippet:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate enim hic omnis, corrupti natus deserunt totam quae officia quos impedit.",
  //   },
  // ];
  res.redirect("/blogs"); // res.render("index", { title: "Home", blogs });
});
app.get("/about-me", function (req, res) {
  res.redirect("/about");
});
app.get("/about", function (req, res) {
  res.render("about", {
    title: "About"
  });
});
app.get("/blogs", function (req, res) {
  Blog.find().sort({
    createdAt: -1
  }).then(function (result) {
    return res.render("index", {
      title: "Home",
      blogs: result
    });
  })["catch"](function (err) {
    return console.error(err);
  });
});
app.get("/blogs/create", function (req, res) {
  res.render("create", {
    title: "Create a new blog"
  });
});
app.use(function (req, res) {
  res.status(404).render("404", {
    title: "Error 404"
  });
});