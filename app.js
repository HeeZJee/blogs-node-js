const express = require("express");

const app = express();

const port = 3000;
app.listen(port);

app.get("/", (req, res) => {
  res.sendFile("./html/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./html/about.html", { root: __dirname });
});

app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

app.use((req, res) => {
  res.status(404).sendFile("./html/404.html", { root: __dirname });
});
