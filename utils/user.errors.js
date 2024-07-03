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