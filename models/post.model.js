const { DataTypes } = require("sequelize");
const sequelize = require("../config/config.js");

const Post = sequelize.define(
    "Post",
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
                model: "User",
                key: "id"
            }
        },
        post: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("content", value.trim());
            }
        },
        likes: {
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: true
    }
);

module.exports = Post;
