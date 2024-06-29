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

    try {
        const poster = await postModel.findByPk(postId);

        if (!poster) {
            return res.status(404).json({ error: "Post non trouvé" });
        }

        poster.post = posts;
        const updatedPost = await poster.save();

        return res.json(updatedPost);
    } catch (err) {
        console.error("Erreur lors de la mise à jour du post :", err);
        return res.status(500).json({ error: "Erreur lors de la mise à jour du post" });
    }
};
module.exports.deletePosts = async (req, res) => {};
