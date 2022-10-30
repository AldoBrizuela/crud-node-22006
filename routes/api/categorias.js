const express = require('express');
const router = express.Router();

const controller = require('../../controllers/api/categorias');//con el controller llamo a las funciones que muestran los recibido en los json desde postman

router.get('/categorias', controller.index);

router.post('/categorias', controller.store);

router.get('/categorias/:id', controller.show);

router.put('/categorias', controller.update);

router.delete('/categorias/:id', controller.delete);//paso un id de la categoria para que el controller lo elimine de la base

module.exports = router;//disponibilizo modulo  router para poder acceder a las rutas desde otros lugares del proyecto