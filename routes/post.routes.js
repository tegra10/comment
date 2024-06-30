"use strict";
const express = require("express");
const Router = express.Router();
const {
    setPosts,
    getPosts,
    editPosts,
    deletePosts
} = require("../controllers/post.controller.js");

const {login,getOneUser,logout}=require('../auth/user.auth.js')

// kes authentifications d'enregistrement sur le site
Router.post("/register", setPosts);

// les operations sur les données déjà enregistrer
Router.get("/", getPosts);
Router.put("/edit-post/:id", editPosts);
Router.delete("/delete-post/:id", deletePosts);

// requettes d'authentifications aprés enregistrement

Router.post("/login", login);
Router.get("/:id", getOneUser);
Router.get("/logout", logout);

module.exports = Router;
