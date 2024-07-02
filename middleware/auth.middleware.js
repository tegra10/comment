const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie("jwt", "", { maxAge: 1 });
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
};

module.exports.requireAuth = (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
            if (err) {
              console.log(err)
            }else{
              console.log(decodedToken.id)
            }
        });
    }else{
      console.log('no TOKEN')
    }
};
