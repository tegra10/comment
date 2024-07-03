"use strict";
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");
const {signinErrors}=require('../utils/user.errors.js')
const cookieToken = process.env.TOKEN;
const maxAge = 3600000;

// Fonction pour générer un token JWT
function generateToken(user) {
    return jwt.sign({ userId: user.id }, cookieToken, {
        expiresIn: maxAge
    });
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Veuillez fournir un email et un mot de passe" });
    }

    try {
        const user = await userModel.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        const isValid = await user.verifyPassword(password);
        if (!isValid) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true, maxAge }); // 1 heure
        return res.status(201).json({ user: user.id });
    } catch (err) {
        const errors = signinErrors(err)
        return res.status(500).json({ errors });
    }
};

module.exports.logout = async (req, res) => {
    // Ajoutez ici la logique de déconnexion de l'utilisateur
    res.cookie('token','',{maxAge:1})
    res.redirect('/')
};