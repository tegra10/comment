"use strict";
module.exports.logupErrors = err => {
    let errors = { email: "" };
    if (err.errors && err.errors.length > 0) {
        err.errors.forEach(error => {
            if (error.path === "email") {
                if (error.message.includes("must be unique")) {
                    errors.email = "Cet email est déjà pris.";
                } else if (error.message.includes("is not valid")) {
                    errors.email = "Email incorrect.";
                }
            }
        });
    }
    return errors;
};

module.exports.signinErrors = err => {
    let errors = { email: "", password: "" };

    if (err.message.includes("email")) errors.email = "email inconnu";

    if (err.message.includes("password")) errors.email = "mot de passe incorrect";
};
