const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/categorias');//con el controller llamo a las funciones que muestran las vistas que tengo armadas

router.get('/categorias', controller.index);

router.get('/categorias/create', controller.create);
router.post('/categorias/store', controller.store);

router.get('/categorias/:id', controller.show);

router.get('/categorias/:id/edit', controller.edit);//traer el form con la info de la categoria a editar
router.put('/categorias/update', controller.update);//mediante el method_override envio los datos del form a actualizar en la base

router.delete('/categorias/:id/delete',controller.delete);//paso un id de la categoria para que el controller lo elimine de la base

module.exports = router;//disponibilizo modulo  router para poder acceder a las rutas desde otros lugares del proyecto