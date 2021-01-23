const express = require("express");
const morgan = require("morgan");
const { PORT, USER, PASS } = require("./config");
const app = express();

const dbURI = `mongodb+srv://${USER}:${PASS}@blog-cluster.oyikf.mongodb.net/<dbname>?retryWrites=true&w=majority`;

// register view engine
app.set("view engine", "ejs");
app.set("views", "html");

// const port = 3000;
app.listen(PORT);

app.use(morgan("dev"));

app.use(express.static("public"));

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "From Earth to Space and Beyond",
      snippet:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate enim hic omnis, corrupti natus deserunt totam quae officia quos impedit.",
    },
    {
      title: "From Earth to Space and Beyond",
      snippet:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate enim hic omnis, corrupti natus deserunt totam quae officia quos impedit.",
    },
    {
      title: "From Earth to Space and Beyond",
      snippet:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate enim hic omnis, corrupti natus deserunt totam quae officia quos impedit.",
    },
  ];

  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Error 404" });
});
