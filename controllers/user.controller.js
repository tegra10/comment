"use strict";
const userModel = require("../models/user.model.js");


module.exports.setPosts = async (req, res) => {
    try {
        const { name, postname, email, password } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Merci d'ajouter le nom" });
        } else if (!email) {
            return res.status(400).json({ message: "Merci d'ajouter l'email" });
        } else if (!postname) {
            return res.status(400).json({ message: "Merci d'ajouter un postnom" });
        } else if (!password) {
            console.error("Il y a une erreur");
            return res.status(400).json({ message: "Merci d'ajouter le mot de passe" });
        }

        const newPost = await userModel.create({ name, postname, email, password });
        return res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ err });
    }
};
module.exports.getPosts = async (req, res) => {
    try {
        const users = await userModel.findAll();
        if (!users || users.length === 0) {
            res.status(404).json({ message: "Aucun utilisateur trouvé" });
        } else {
            res.status(200).json(users);
        }
    } catch (err) {
        console.error("Erreur :", err);
        res.status(500).json({
            message:
                "Une erreur s'est produite lors de la récupération des utilisateurs"
        });
    }
};
