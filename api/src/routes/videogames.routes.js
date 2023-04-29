const { Router } = require("express");
const axios = require("axios");
const { Videogame } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  let config = {
    url: `https://api.rawg.io/api/genres?key=${process.env.API_KEY}`,  //https://api.rawg.io/api/games
    method: "get",
  };
  const response = await axios.request(config);
  res.json(response.data.results);
});

router.get("/:idVideogame", async (req,res) => {
    let config = {
        url: `https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`,
        method: "get",
      };
    const response = await axios.request(config.params.id);
    const attributes = {
        id: data.id,
        name: data.name,
        description: data.description,
        platforms: data.platforms,
        image: data.image,
        releasedAt: data.releasedAt,
        rating: data.rating
    };
    res.json(attributes);
});


module.exports = router;
