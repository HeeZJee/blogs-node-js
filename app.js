const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
// console.log(Blog);

const { PORT, USER, PASS, DB_NAME } = require("./config");
const app = express();
const dbURI = `mongodb+srv://${USER}:${PASS}@blog-cluster.oyikf.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

// connect to mongodb
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT || 3000);
    console.log(`App running at port: ${PORT}`);
  })
  .catch((err) => console.error(err));

// register view engine
app.set("view engine", "ejs");
app.set("views", "html");

//  logger middleware
app.use(morgan("combined"));

// public files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// home page redirect to blogs
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// about page
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blogs page
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Error 404" });
});
