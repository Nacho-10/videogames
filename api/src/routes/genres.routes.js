const axios = require ('axios');
const { Router } = require('express');
const { Genre } = require('../db.js');

const router = Router();

router.get('/guardar', async (req,res) => {
let config= {url:`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`, method:'get'}
const response = await axios.request(config)
res.send(response) 

});


module.export= router;