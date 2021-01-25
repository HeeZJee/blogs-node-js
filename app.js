const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
// console.log(Blog);

const { PORT, USER, PASS, DB_NAME } = require("./config");
const { result } = require("lodash");
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

// const port = 3000;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
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
  res.redirect("/blogs");

  // res.render("index", { title: "Home", blogs });
});

app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Error 404" });
});
