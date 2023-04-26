const { Router } = require("express");
const axios = require("axios");
const { Videogame } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  let config = {
    url: `https://api.rawg.io/api/genres?key=${process.env.API_KEY}`,
    method: "get",
  };
  const response = await axios.request(config);
  res.json(response.data);
});

module.exports = router;
