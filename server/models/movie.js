'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.hasMany(models.Ticket, {foreignKey: 'MovieId'})
    }
  }
  Movie.init(
    {
      tmdbId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      synopsis: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      imgUrl: DataTypes.TEXT,
    },
    {
      hooks: {
        beforeBulkCreate: (movie, opt) => {
          movie.price = 40000;
        },
        beforeCreate: (movie, opt) => {
          movie.price = 40000;
        },
      },
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};