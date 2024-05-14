'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.User, {foreignKey: 'UserId'})
      Ticket.belongsTo(models.Movie, {foreignKey: 'MovieId'})
    }
  }
  Ticket.init(
    {
      UserId: DataTypes.INTEGER,
      MovieId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      isPaid: DataTypes.BOOLEAN,
      paymentUrl: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (ticket, option) => {
          ticket.isPaid = false;
        },
      },
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};