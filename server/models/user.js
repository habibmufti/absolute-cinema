"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/bcryptPassword");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Ticket, {foreignKey: 'UserId'})
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `first name is required`,
          },
          notEmpty: {
            msg: `first name is required`,
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `last name is required`,
          },
          notEmpty: {
            msg: `last name is required`,
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "email address already in use!",
        },
        validate: {
          notNull: {
            msg: `email is required`,
          },
          notEmpty: {
            msg: `email is required`,
          },
          isEmail: {
            msg: `your email format is incorrect`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `password is required`,
          },
          notEmpty: {
            msg: `password is required`,
          },
          minLength(value) {
            if (value.length < 5) {
              throw new Error(`minimum characters for password is 5`);
            }
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (user, opt) => {
          user.password = hashPassword(user.password);
          user.role = `Cust`;
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
