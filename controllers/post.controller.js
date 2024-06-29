"use strict";
const postModel = require("../models/post.model.js");
module.exports.setPosts = async (req, res) => {
    const { userId, posts } = req.body;
    try {
        if (!userId) {
            return res.status(400).json({ message: "id non reconnue" });
        } else if (!posts) {
            return res.status(400).json({ message: "merci d'ajouter un post" });
        }

        const post = await postModel.create({
            userId,
            posts
        });

        return res.status(201).json(post);
    } catch (err) {
        console.error(err);
    }
};
module.exports.getPosts = async (req, res) => {
    try {
        const posts = await postModel.findAll();
        if (!posts || posts.length === 0) {
            res.status(404).json({ message: "Aucun post trouvé" });
        } else {
            res.status(200).json(posts);
        }
    } catch (err) {
        console.error("Erreur :", err);
        res.status(500).json({
            message:
                "Une erreur s'est produite lors de la récupération des posts"
        });
    }
};
module.exports.editPosts = async (req, res) => {
    const postId = req.params.id;
    const { posts } = req.body;
    postModel
        .findByPk(postId)
        .then(post => {
            if (!post)
                res.status(500).json({ message: `le poste n'existe pas` });

            post.posts = posts;
            return post.save();
        })
        .then(updatePost => {
            res.json(updatePost);
        }).catch(err=>{
          res.status(500).send(err)
          console.error(err)
        })
};
module.exports.deletePosts = async (req, res) => {};
