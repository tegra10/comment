"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/config.js");
const Comment = sequelize.define(
    "posts",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        posts: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("posts", value.trim());
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
module.exports = Comment;
