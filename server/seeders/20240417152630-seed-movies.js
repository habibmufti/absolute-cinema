"use strict";
const axios = require("axios");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const { data } = await axios({
      method: "get",
      url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzE3MjIwMjU1NmNjNGY1OGFkNzIwYzk3YzZkNGViNiIsInN1YiI6IjY2MWVmNWM4NmEzMDBiMDE3ZTMyYWMwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4uL8Tbw4qNRfaL33Ua0pC8wzHIJBHBdbl0lM_N7wVDg",
      },
    });
    let result = data.results;
    result.map((e) => {
      e.tmdbId = e.id;
      e.title = e.original_title;
      e.synopsis = e.overview;
      e.rating = e.vote_average;
      e.price = 40000;
      e.imgUrl = "https://image.tmdb.org/t/p/original" + e.backdrop_path;
      e.updatedAt = e.createdAt = new Date();
      delete e.id; delete e.adult; delete e.backdrop_path; delete e.genre_ids; delete e.original_language; delete e.original_title; delete e.overview; delete e.popularity; delete e.poster_path; delete e.release_date; delete e.video; delete e.vote_average; delete e.vote_count;
      return e;
    });
    await queryInterface.bulkInsert('Movies', result, {})
    console.log(`seed movies success`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Movies", null, {});
  },
};
