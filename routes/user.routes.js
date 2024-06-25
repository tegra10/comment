const express = require("express");
const Router = express.Router();
const {getPosts}= require("../controllers/user.controller.js");
Router.get("/", getPosts);

module.exports = Router;
