const { Router } = require ('express');

const router = Router();

router.get('/videogames',(req,res) => {
    const videogame = Videogame.findAll();

    console.log('hola');
})

module.export= router;
