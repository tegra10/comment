"use strisct";
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");
const cookieToken = process.env.TOKEN;
// Fonction pour générer un token JWT
function generateToken(user) {
    return jwt.sign({ userId: user.id }, cookieToken, {
        expiresIn: "1h"
    });
}
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ where: { email } });

        if (!user) {
            return res
                .status(401)
                .json({ message: "Email ou mot de passe incorrect" });
        }

        const isValid = await user.verifyPassword(password);
        if (!isValid) {
            return res
                .status(401)
                .json({ message: "Email ou mot de passe incorrect" });
        }

        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 heure
        // res.status(200).json({ message: "Logged in" });

        return res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Une erreur est survenue" });
    }
};

module.exports.logout = async (req, res) => {};
