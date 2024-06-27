const express = require("express");
const Router = express.Router();
const {setPosts,getPosts}= require("../controllers/user.controller.js");
Router.post('/', setPosts)
Router.get("/", getPosts);

module.exports = Router;
