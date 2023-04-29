const axios = require("axios");
const { Router } = require("express");
const { Genre } = require("../db.js");

const router = Router();

router.get("/guardar", async (req, res) => {
  let config = {
    url: `https://api.rawg.io/api/genres?key=${process.env.API_KEY}`,
    method: "get",
  };
  const response = await axios.request(config);
  response.data.results.map(async (genre) => {
    /* console.log(genre.name)
    console.log(genre.id) */
    await Genre.create({ name: genre.name });
  });
  res.send("generos guardados");
});

router.get("/", async (req, res) => {
  const genres = await Genre.findAll();
  //console.log(genres);
  res.json(genres);
});

module.exports = router;
