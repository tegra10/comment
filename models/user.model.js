const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");
const sequelize = require("../config/config.js");

const User = sequelize.define(
    "users",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("name", value.trim());
            }
        },
        postname: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("postname", value.trim());
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "L'adresse email est invalide"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            set(value) {
                this.setDataValue("password", value.trim());
            }
        },
        picture: {
            type: DataTypes.STRING,
            defaultValue: "photo.jpg"
        }
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: true
    }
);

//model centré sur les posts

// Hook pour saler et hasher le mot de passe avant de sauvegarder un nouvel utilisateur
User.beforeCreate(async (user, options) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
});

module.exports = User;

