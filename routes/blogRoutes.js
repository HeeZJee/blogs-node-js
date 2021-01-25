const express = require("express");
const router = express.Router();
const blogController = require("./../controllers/blogsController");

const Blog = require("../models/blogs");

router.get("/", blogController.blog_index);

router.post("/", blogController.blog_create_post);

router.get("/create", blogController.blog_create);

router.get("/:_id", blogController.blog_details);

router.delete("/:id", blogController.blog_delete_post);

module.exports = router;
