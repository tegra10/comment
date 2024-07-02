"use stric";
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");

module.exports.checkUser = (req, res, next) => {
    const token = res.cookies.jwt;
    try {
        if (!token) {
            jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
                if (err) {
                    res.locals.user = null;
                    res.cookie("token", "", { maxAge: 1 });
                    next();
                } else {
                    let user = await userModel.findByPk(decodedToken.id);
                    res.locals.user = user;
                    console.log(res.locals.user);
                    next();
                }
            });
        } else {
            res.locals.user = null;
            next();
        }
    } catch (err) {
        console.error(err);
    }
};
