const { Router } = require('express');
const axios = require('axios');
const genresRouter = require('./genres.routes.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/genres' , genresRouter);


module.export= router;