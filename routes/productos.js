const express = require('express');
const router = express.Router();

const controller = require('../controllers/productos');//con el controller llamo a las funciones que muestran las vistas que tengo armadas

router.get('/productos', controller.index);

router.get('/productos/:codigo', controller.show);

module.exports = router;//disponibilizo modulo  router para poder acceder a las rutas desde otros lugares del proyecto