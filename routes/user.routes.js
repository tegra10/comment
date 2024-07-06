const express = require("express");
const Router = express.Router();
const {
    setUsers,
    getUsers,
    getOneUser,
    editUsers,
    deleteUsers
} = require("../controllers/user.controller.js");

const { uploadProfile } = require("../controllers/upload.controller.js");
const multer = require("multer");
const upload = multer();

const { login, logout } = require("../auth/user.auth.js");

// requettes liées à l'utilisateur
Router.post("/register", setUsers);
Router.get("/", getUsers);
Router.get("/:id", getOneUser);
Router.put("/edit-user/:id", editUsers);
Router.delete("/delete-user/:id", deleteUsers);

// requettes d'authentifications aprés enregistrement

Router.post("/login", login);
Router.get("/logout", logout);

Router.post("/upload", upload.single("file"), uploadProfile);

module.exports = Router;
