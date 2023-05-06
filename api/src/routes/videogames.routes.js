const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db.js");
const { Error } = require("sequelize");

const router = Router();

router.get("/", async (req, res) => {
  let {name} = req.query;
  name = name.toLowerCase();
  let config = {
    url: `https://api.rawg.io/api/games?key=${process.env.API_KEY}`,
    method: "get",
  };
  const dbGames = await Videogame.findAll();
  if(name) {
    const filtered = dbGames.filter(game => game.name.toLowerCase().includes(name));
    config.url = `https://api.rawg.io/api/games?search=${name}&key=${process.env.API_KEY}`
  };
  
   
  console.log(filtered);
  const response = await axios.request(config);
  

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
    const dbVideogame = await getDbVideogame(idVideogame);
    if (dbVideogame) {
      //console.log("dbVideogame", dbVideogame);
      return res.status(200).json(dbVideogame);
    }

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
    res.status(400).send("Not found");
    console.log("este es el error del catch", error);
  }
});

const getDbVideogame = async (idVideogame) => {
  try {
    const dbVideogame = await Videogame.findByPk(idVideogame);
    return dbVideogame;
  } catch (error) {
    console.log(error);
    return null;
  }
};

router.post("/", async (req, res) => {
  const videogame = req.body;
  //console.log(req.body);
  const save = Videogame.create(videogame);

  res.json({ message: "Se creó exitosamente", videogame });
});


module.exports = router;
