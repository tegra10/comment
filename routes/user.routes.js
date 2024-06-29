const express = require("express");
const Router = express.Router();
const {
    setUsers,
    getUsers,
    editUsers,
    deleteUsers
} = require("../controllers/user.controller.js");



// requettes liées à l'utilisateur
Router.post("/", setUsers);
Router.get("/", getUsers);
Router.put("/edit-user/:id", editUsers);
Router.delete("/delete-user/:id", deleteUsers);


module.exports = Router;
