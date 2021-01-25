const Blog = require("../models/blogs");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => res.render("index", { title: "Home", blogs: result }))
    .catch((err) => console.error(err));
};

const blog_details = (req, res) => {
  const id = req.params._id;
  Blog.findById(id)
    .then((blog) => res.render("details", { title: "Detail Page", blog }))
    .catch((err) => console.log(err));
};

const blog_create = (req, res) => {
  res.render("create", { title: "Create a new blog" });
};

const blog_create_post = (req, res) => {
  const blogs = new Blog(req.body);
  blogs
    .save()
    .then(() => res.redirect("/blogs"))
    .catch((err) => console.log(err));

  console.log(req.body);
};

const blog_delete_post = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.error(err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create,
  blog_create_post,
  blog_delete_post,
};
