"use strict";
const userModel = require("../models/user.model.js");

module.exports.setUsers = async (req, res) => {
    try {
        const { name, postname, email, password } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Merci d'ajouter le nom" });
        } else if (!email) {
            return res.status(400).json({ message: "Merci d'ajouter l'email" });
        } else if (!postname) {
            return res
                .status(400)
                .json({ message: "Merci d'ajouter un postnom" });
        } else if (!password) {
            console.error("Il y a une erreur");
            return res
                .status(400)
                .json({ message: "Merci d'ajouter le mot de passe" });
        }

        const newPost = await userModel.create({
            name,
            postname,
            email,
            password
        });
        return res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ err });
    }
};
module.exports.getUsers = async (req, res) => {
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
module.exports.editUsers = async (req, res) => {
    const userId = req.params.id;
    const { name, postname, password } = req.body;
    userModel
        .findByPk(userId)
        .then(user => {
            if (!user) {
                res.status(404).json({ error: "Utilisateur non trouvé" });
            } else {
                user.name = name;
                user.postname=postname
                return user.save();
            }
        })
        .then(updatedUser => {
            res.json(updatedUser);
        })
        .catch(err => {
            console.error(
                "Erreur lors de la mise à jour de l'utilisateur :",
                err
            );
            res.status(500).json({
                error: "Erreur lors de la mise à jour de l'utilisateur"
            });
        });
};

module.exports.deleteUsers = async (req, res) => {
  const userId = req.params.id
  try{
    userModel.findByPk(userId).then(user=>{
      if(!user){
        res.status(500).json({message:`utilisateur introuvable`})
      }else{
        return user.destroy()
      }
      
    }).then(()=>{
      res.status(200).json({message:`utilisateur supprimé`})
    })
    
  }catch(err){
    console.error(err)
  }
};
