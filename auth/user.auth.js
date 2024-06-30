"use strisct";
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
};
module.exports.getOneUser = async (req, res) => {
  const {id}=req.params
};
module.exports.logout = async (req, res) => {
  
};
