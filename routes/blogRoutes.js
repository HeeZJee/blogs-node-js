const express = require("express");
const router = express.Router();

const Blog = require("../models/blogs");

router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => res.render("index", { title: "Home", blogs: result }))
    .catch((err) => console.error(err));
});

router.post("/", (req, res) => {
  const blogs = new Blog(req.body);

  blogs
    .save()
    .then(() => res.redirect("/blogs"))
    .catch((err) => console.log(err));

  console.log(req.body);
});

router.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

router.get("/:_id", (req, res) => {
  const id = req.params._id;
  Blog.findById(id)
    .then((blog) => res.render("details", { title: "Detail Page", blog }))
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.error(err));
});

module.exports = router;
