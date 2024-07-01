"use strict";
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const Sequelize = require("sequelize");
const app = express();
const sequelize = require("./config/config.js");
const { checkUser } = require("./middleware/auth.middleware.js");
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use("/user/api", require("./routes/user.routes.js"));
app.use("/post", require("./routes/post.routes.js"));

app.get("*", checkUser);
app.listen(port, () => {
    console.log(`the server run on port ${port}`);
});
