"use strict";
const express = require("express");
const Router = express.Router();
const {
    setPosts,
    getPosts,
    editPosts,
    deletePosts
} = require("../controllers/post.controller.js");
Router.post("/", setPosts);
Router.get("/", getPosts);
Router.put("/edit-post/:id", editPosts);
Router.delete("/delete-post/:id", deletePosts);
module.exports = Router;
