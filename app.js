const express = require("express");

const app = express();

// register view engine
app.set("view engine", "ejs");
app.set("views", "html");

const port = 3000;
app.listen(port);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/blogs/create", (req, res) => {
  res.render("create");
});

app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

app.use((req, res) => {
  res.status(404).render("404");
});
