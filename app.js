'use strict'
require("dotenv").config();
const express = require("express");
const Sequelize = require("sequelize");
const app = express();
const sequelize = require("./config/config.js");
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user/api', require('./routes/user.routes.js') );
app.use('/post', require('./routes/post.routes.js'))
app.listen(port, () => {
    console.log(`the server run on port ${port}`);
});
