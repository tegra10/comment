"use strict";
const express = require("express");
const Router = express.Router();
const {
    setPosts,
    getPosts,
    editPosts,
    deletePosts,
    
} = require("../controllers/post.controller.js");

// kes authentifications d'enregistrement sur le site
Router.post("/", setPosts);

// les operations sur les données déjà enregistrer
Router.get("/", getPosts);
Router.put("/edit-post/:id", editPosts);
Router.delete("/delete-post/:id", deletePosts);


module.exports = Router;
