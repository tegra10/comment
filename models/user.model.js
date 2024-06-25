const { DataTypes } = require("sequelize");
const {isEmail}=require('validator')
const User = sequelize.define("users", {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:[isEmail]
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue("password", value.trim());
        }
    },picture:{
      type:DataTypes.STRING,
      defaultValue:'photo.jpg'
    },
    timestamps: true,
    createAt:true,
    updatedAt:true
});
