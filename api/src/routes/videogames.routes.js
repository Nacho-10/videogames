const { Router } = require("express");
const axios = require("axios");
const { Videogame } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  let config = {
    url: `https://api.rawg.io/api/games?key=${process.env.API_KEY}`,
    method: "get",
  };
  const response = await axios.request(config);
  const dbGames = await Videogame.findAll();

  const gamesNormalized = response.data.results.map((game) => {
    const attributesGame = {
      id: game.id,
      name: game.name,
      description: game.description,
      platforms: game.platforms,
      image: game.background_image,
      releasedAt: game.released,
      rating: game.rating,
      genres: game.genres,
    };
    return attributesGame;
  });
  const allGames = [...gamesNormalized, ...dbGames];

  res.json(allGames);
});

router.get("/:idVideogame", async (req, res) => {
  try {
    const { idVideogame } = req.params;
    let config = {
      url: `https://api.rawg.io/api/games/${idVideogame}?key=${process.env.API_KEY}`,
      method: "get",
    };
    const response = await axios.request(config);
    const attributes = {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description,
      platforms: response.data.platforms,
      image: response.data.background_image,
      releasedAt: response.data.released,
      rating: response.data.rating,
      genres: response.data.genres,
    };
    res.json(attributes);
  } catch (error) {
    console.log(error.response)
  }
});

router.post("/", async (req, res) => {
  const videogame = req.body;
  console.log(req.body);
  const save = Videogame.create(videogame);

  res.json({ message: "Se creó exitosamente", videogame });
});

module.exports = router;
