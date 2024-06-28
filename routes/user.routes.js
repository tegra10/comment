const express = require("express");
const Router = express.Router();
const {
    setPosts,
    getPosts,
    editPosts
} = require("../controllers/user.controller.js");
Router.post("/", setPosts);
Router.get("/", getPosts);
Router.put("/:id", editPosts);

module.exports = Router;
