"use strict";
const userModel = require("../models/user.model.js");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const uploadDir = "upload/images/profil";

module.exports.uploadProfile = async (req, res) => {
    try {
        if (
            req.file.detectedMineType != "image/jpg" &&
            req.file.detectedMineType != "image/png" &&
            req.file.detectedMineType != "image/jpeg"
        )
            throw Error("invalide file");

        if (req.file.size > 10000000) throw Error("invalide size");
    } catch (err) {
        return res.status(500).json(err);
    }

    const fileName = `${req.body.name}.jpg`;

    await pipeline(
        req.file.stream,
        fs.createWriteStream(`${__dirname}/../upload/images/profil/${fileName}`)
    );
};
