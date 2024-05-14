const { where } = require("sequelize");
const { Movie } = require("../models");
const axios = require('axios');

class MovieController {
  static async getNowShowing(req, res, next) {
    try {
      const data = await Movie.findAll({});
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async getMovieDetail(req, res, next) {
    try {
      const {id} = req.params
      const movie = await Movie.findOne({
        where:{id}
      })
      const response = await axios({
        method: "get",
        url: `https://api.themoviedb.org/3/movie/${movie.tmdbId}`,
        headers: {
          Authorization: "Bearer " + process.env.TMDB_TOKEN,
        },
      });
      const data = response.data
      res.status(200).json(data)
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MovieController;
